# django -> helper -> services.py
from InquirerPy import get_style # for input
from pras.django.helper.handlers import RequirementChecker

__all__ = ["ProjectCreator", 
           "style",
           "RequirementChecker"]

style = get_style({
    "questionmark": "#ffec45",
    "answermark": "bold",
    "answer": "#61afef",
    "input": "#98c379",
    "question": "bold",
    "answered_question": "",
    "instruction": "#abb2bf",
    "long_instruction": "#abb2bf",
    "pointer": "#61afef",
    "checkbox": "#98c379",
    "separator": "",
    "skipped": "#5c6370",
    "validator": "",
    "marker": "#e5c07b",
    "fuzzy_prompt": "#c678dd",
    "fuzzy_info": "#abb2bf",
    "fuzzy_border": "#4b5263",
    "fuzzy_match": "#c678dd",
    "spinner_pattern": "#e5c07b",
    "spinner_text": "",
})


class ProjectCreator:
    from typing import Literal
    def __init__(
            self, 
            project_name: str,
            project_location: str, 
            template_folder_name: str = "template", 
            app_name: str = "app", 
            git: bool = True, 
            orm: Literal["Django", "SQLAlchemy"] = "Django", 
            db_config: dict = {},
            packages: list[str] = []
        ):
        import os
        from pras.django.helper.utils import generate_django_orm_config, generate_sqlalchemy_url
        
        self._project_name = project_name
        self._project_location = os.path.abspath(project_location)
        self._template_folder_name = template_folder_name
        self._app_name = app_name
        self._git = git
        self._orm = orm
        self._raw_db_config = db_config
        self._db_config = (generate_sqlalchemy_url(db_config) if orm == "SQLAlchemy" else generate_django_orm_config(db_config)) if db_config else {}
        self._packages = packages
        self.__step = 0
        self._warning = []
        self._collect_all_required_packages()

    def _execute_command(self, command, error_message, pbar):
        """Execute a command and handle errors."""
        import subprocess # for running commands
        import time 
        
        try:
            process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

            stdout_lines = []
            for line in iter(process.stdout.readline, ''):
                stdout_lines.append(line.strip())
                pbar.update(1)
                time.sleep(0.02)

            # Wait for the process to complete and get the stderr output
            process.wait()
            stderr_output = process.stderr.read().strip()

            # Check for errors
            if process.returncode != 0:
                if self.__step != 3:
                    pbar.close()
                    process.kill()
                return None, stderr_output

            # Return stdout and indicate no error
            return '\n'.join(stdout_lines), None
        except Exception as e:
            if self.__step != 3:
                pbar.close()
                process.kill()
            return None, str(e)


    def _collect_all_required_packages(self) -> list[str]:
        """Collect all required packages, with user packages first and no duplicates."""
        from pras.django.helper.utils import get_required_packages

        db_packages = get_required_packages(self._raw_db_config.get("engine")) if self._raw_db_config else []
        fixed_packages = ['pip', 'django']
        user_packages = self._packages

        # Combine lists with user packages first and remove duplicates, preserving order
        all_packages = list(dict.fromkeys(user_packages + fixed_packages + db_packages))
        
        self._packages = all_packages
        return all_packages


    def _create_virtualenv(self, pbar):
        """Create virtualenv for the project."""
        import shutil
        import subprocess
        creation_command = ["virtualenv", "venv"]
        if shutil.which("virtualenv") is None:
            try:
                if subprocess.run(["python", "-m", "virtualenv", "--version"], stdout=subprocess.PIPE, stderr=subprocess.PIPE).returncode == 0:
                    creation_command = ["python", "-m", "virtualenv", "venv"]
            except Exception as e:
                creation_command = ["python3", "-m", "virtualenv", "venv"]
                
        stdout, error = self._execute_command(creation_command, "Failed to create virtualenv", pbar)
        if error:
            raise Exception(error)

    def _install_packages(self, pbar):
        """Install required packages in the virtualenv."""
        import os
        pip_executable = os.path.join("venv", "Scripts", "pip") if os.name == 'nt' else os.path.join("venv", "bin", "pip")

        for package in self._packages:
            stdout, error = self._execute_command([pip_executable, "install", package], f"Error installing package {package}", pbar)
            if error:
                self._warning.append(error)

    def _create_django_project(self, pbar):
        """Create a Django project."""
        import os
        os.chdir(os.path.join(self._project_location, self._project_name))
        django_admin = os.path.join("venv", "Scripts", "django-admin") if os.name == 'nt' else os.path.join("venv", "bin", "django-admin")
        
        stdout, error = self._execute_command([django_admin, "startproject", self._project_name, "."], "Failed to create Django project", pbar)
        if error:
            self._warning.append(error)

    def _create_django_app(self, pbar):
        """Create a Django app."""
        import os
        if self._app_name:
            os.chdir(os.path.join(self._project_location, self._project_name))
            django_admin = os.path.join("venv", "Scripts", "django-admin") if os.name == 'nt' else os.path.join("venv", "bin", "django-admin")
            
            stdout, error = self._execute_command([django_admin, "startapp", self._app_name], f"Failed to create Django app '{self._app_name}'", pbar)

            if self._template_folder_name:
                os.makedirs(os.path.join(self._project_location, self._project_name, self._app_name, self._template_folder_name), exist_ok=True)

            if error:
                raise Exception(error)

    def _initialize_git(self, pbar):
        """Initialize Git for the project."""
        stdout, error = self._execute_command(["git", "init"], "Failed to initialize Git repository", pbar)
        if error:
            raise Exception(error)

    def _rollback(self):
        """Delete all files created so far if an error occurs."""
        import os
        import shutil
        import click
        from colorama import Fore, Style
        import stat
        try:
            os.chdir(self._project_location)
 
            shutil.rmtree(
                self._project_name,
            )            
        except Exception as e:
            click.echo(f"Error during rollback: {e}")

    def _configure_project(self, pbar):
        """Configure the project."""
        import os
        from pras.django.helper.handlers import ConfigHandler

        try:
            os.chdir(os.path.join(self._project_location, self._project_name))
            config = ConfigHandler(self.__dict__)
            config.run()

            python = os.path.join("venv", "Scripts", "python") if os.name == 'nt' else os.path.join("venv", "bin", "python")

            stdout, error = self._execute_command([python, f"{self._project_name}.py"], "Failed to configure project", pbar)

            os.remove(f"{self._project_name}.py")
            if error:
                raise Exception(error)
        except Exception as e:
            raise Exception(e)


    def create_project(self):
        """Main method to initiate project creation process with a progress bar."""
        import click
        from tqdm import tqdm
        import time
        from colorama import Style, Fore
        import os
        import click

        steps = [
            ("Creating project folder", self._create_project_folder),
            ("Creating virtualenv", self._create_virtualenv),
            ("Installing packages", self._install_packages),
            ("Creating Django project", self._create_django_project if self._orm == "Django" else None),
            ("Creating Django app", self._create_django_app if self._orm == "Django" else None),
            ("Initializing Git", self._initialize_git if self._git else None),
            ("Configure Project", self._configure_project)
        ]
        
        click.echo("\n")

        with tqdm(total=100, desc="Creating project", ncols=75, bar_format="{l_bar}{bar}| {n_fmt}/{total_fmt}%") as pbar:
            try:
                for step_name, step_func in steps:
                    if step_func:
                        self.__step += 1
                        step_func(pbar)  # Execute the step function
                
                if pbar.total - pbar.n > 0:
                    for _ in range(pbar.total - pbar.n):
                        pbar.update(1)
                        time.sleep(0.02)
                
            except Exception as e:
                pbar.close()
                click.echo(f"{Fore.RED}\n\nError: {e}\n{Style.RESET_ALL}")
                self._rollback()
                click.echo(f"{Fore.RED}{Style.BRIGHT}Project creation failed.{Style.RESET_ALL}")
                return
            
            except (KeyboardInterrupt, EOFError):
                pbar.close()
                click.echo(f"{Fore.RED}\n\nProject creation cancelled by user.\n{Style.RESET_ALL}")
                self._rollback()
                return

        if os.path.exists(os.path.join(self._project_location, self._project_name)):

            if self._warning:
                click.echo(f"{Fore.YELLOW}\n\nWarning: {', '.join(self._warning)}\n{Style.RESET_ALL}")

            click.echo(f"{Fore.GREEN}{Style.BRIGHT}\nProject created successfully!{Style.RESET_ALL}")
        

    def _create_project_folder(self, pbar):
        """Create the main project folder."""
        import os
        dir = os.path.join(self._project_location, self._project_name)
        os.makedirs(dir, exist_ok=True)
        os.chdir(dir)
        if self._template_folder_name:
            templatedir = os.path.join(self._project_location, self._project_name, self._template_folder_name)
            os.makedirs(templatedir, exist_ok=True)
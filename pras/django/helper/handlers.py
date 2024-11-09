class RequirementChecker:
    def __init__(self):
        self.missing_requirements = []

    def check_python(self):
        """Check if Python 3 is installed."""
        import shutil
        import click
        if not shutil.which("python3"):
            self.missing_requirements.append("Python")
            click.echo("Python 3 is not installed. Please install Python 3 to continue.")
            return False
        return True

    def check_pip(self):
        """Check if pip is installed."""
        import shutil
        import click
        if not shutil.which("pip3"):
            self.missing_requirements.append("pip3")
            click.echo("pip3 is not installed. Please install pip3 to continue.")
            return False
        return True

    def check_virtualenv(self):
        """Check if virtualenv is installed."""
        import shutil
        if not shutil.which("virtualenv"):
            self.missing_requirements.append("virtualenv")
            return False
        return True
    
    def check_internet_connection(self):
        """Check if the user has an active internet connection."""
        from colorama import Fore
        import click
        import requests
        import sys
        try:
            response = requests.get("https://www.google.com", timeout=5)
            if response.status_code == 200:
                return True
        except requests.ConnectionError:
            click.echo(f"{Fore.LIGHTRED_EX}No internet connection. Please check your network settings.{Fore.RESET}")
            sys.exit(1)
        except requests.Timeout:
            click.echo(f"{Fore.LIGHTRED_EX}Connection timed out. Please check your network settings.{Fore.RESET}")
            sys.exit(1)
        return False



    def run_command_with_progress(self, command):
        """Run a shell command with real-time progress display."""
        import click
        import subprocess
        import time
        from tqdm import tqdm

        with tqdm(total=100, desc="Installing dependencies", bar_format="{l_bar}{bar}| {n_fmt}/{total_fmt}", ncols=75) as pbar:
            process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            try:
                while True:
                    output = process.stdout.readline()
                    if process.poll() is not None:
                        break
                    if output:
                        pbar.update(1)  # Increment bar on each line or chunk of output
                if pbar.total - pbar.n > 0:
                    for _ in range(pbar.total - pbar.n):
                        pbar.update(1)
                        time.sleep(0.02)

            except Exception as e:
                pbar.close()
                click.echo(f"Error occurred: {e}")
                process.kill()
            finally:
                process.stdout.close()
                process.stderr.close()
                process.wait()
        click.echo("\n✔ Dependencies installed successfully.")

    def install_virtualenv(self):
        """Install virtualenv globally if user agrees, with a live loading animation."""

        from colorama import Fore, Style
        import click
        import shutil
        import sys
        import subprocess
        from pras.django.helper.utils import freedesktop_os_release
        from InquirerPy import inquirer        
        from pras.django.helper.services import style

        install_venv = inquirer.confirm(
            message="Missing dependencies. Would you like to install?",
            style=style,
            qmark="❯",
            amark="✔",
            default=True
        ).execute()

        if install_venv:
            try:
                if sys.platform.startswith("linux"):
                    dist = freedesktop_os_release()["NAME"].lower()
                    if 'ubuntu' in dist or 'debian' in dist and shutil.which("apt"):
                        self.run_command_with_progress(["sudo", "apt", "install", "python3-virtualenv", "-y"])
                    elif 'fedora' in dist or 'centos' in dist and shutil.which("dnf"):
                        self.run_command_with_progress(["sudo", "dnf", "install", "python3-virtualenv", "-y"])
                    elif 'arch' in dist and shutil.which("pacman"):
                        self.run_command_with_progress(["sudo", "pacman", "-S", "python-virtualenv", "--noconfirm"])
                    else:
                        click.echo("Unsupported Linux distribution or package manager for automatic installation.")
                        sys.exit(1)
                        return
                elif sys.platform == "darwin":  # macOS
                    if shutil.which("brew"):
                        self.run_command_with_progress(["brew", "install", "virtualenv"])
                    else:
                        click.echo("Homebrew not found. Install Homebrew or use 'pip install virtualenv'")
                        sys.exit(1)
                        return
                elif sys.platform == "win32":
                    self.run_command_with_progress([sys.executable, "-m", "pip", "install", "virtualenv"])

            except subprocess.CalledProcessError:
                click.echo(f'{Fore.RED}{Style.BRIGHT}✗{Style.RESET_ALL} Failed to install "virtualenv". Please install it manually and try again.')
                sys.exit(1)
        else:
            click.echo(f'{Fore.RED}{Style.BRIGHT}✗{Style.RESET_ALL} The "virtualenv" package is required to proceed. Exiting.')
            sys.exit(1)

    def run_checks(self):
        """Run all checks and take actions if required."""
        import sys

        python_ok = self.check_python()
        pip_ok = self.check_pip()
        self.check_internet_connection()
        virtualenv_ok = self.check_virtualenv()

        if not python_ok or not pip_ok:
            sys.exit(1)
        
        if not virtualenv_ok:
            self.install_virtualenv()




class ConfigHandler:
    """Handle all config related tasks."""
    
    def __init__(self, config: dict):
        import os
        self._project_name = config.get("_project_name")
        self._project_location = os.path.abspath(config.get("_project_location"))
        self._template_folder_name = config.get("_template_folder_name")
        self._app_name = config.get("_app_name")
        self._git = config.get("_git")
        self._orm = config.get("_orm")
        self._db_config = config.get("_db_config")
        self._packages = config.get("_packages", [])
        self._warning = []

        # Initialize config and scripts on instantiation
        self._initialize_scripts()

    def _initialize_config(self):
        """Initialize the configuration dictionary."""
        return {
            "project_name": self._project_name,
            "template_dir_name": self._template_folder_name,
            "app_name": self._app_name,
            "packages": self._packages,
            "orm": self._orm,
            "db_config": self._db_config,
        }
    
    def _initialize_scripts(self):
        """Generate and write configuration scripts based on the initialized config."""
        import pras
        import os
        script = []

        # Import statements
        imports = """import os
import importlib
import shutil
"""

        script.append(f"credits = '''{pras.CLI_CREDIT}'''")


        script.append(imports)

        # Configuration dictionary setup
        config_data = f"config = {str(self._initialize_config())}\n"
        script.append(config_data)

        # Add conditional modules based on config
        if self._template_folder_name:
            from pras.django.modules.templateConfig import SCRIPT as template_script
            script.append(template_script)

        if self._app_name:
            from pras.django.modules.appConfig import SCRIPT as app_script
            script.append(app_script)
        
        if self._db_config:
            from pras.django.modules.dbConfig import SCRIPT as db_script
            script.append(db_script)
        
        if 'django-cors-headers' in self._packages:
            from pras.django.modules.corsConfig import SCRIPT as cors_script
            script.append(cors_script)
        
        # Middleware and static configurations
        from pras.django.modules.middlewareConfig import SCRIPT as middleware_script
        script.append(middleware_script)

        from pras.django.modules.staticConfig import SCRIPT as static_script
        script.append(static_script)

        # Main execution block
        main_script = f"""
if __name__ == "__main__":
    {'appConfigHandler()' if self._app_name else ''}
    {'templatesConfigHandler()' if self._template_folder_name else ''}
    {'dbConfigHandler()' if self._db_config else ''}
    {'corsConfigHandler()' if 'django-cors-headers' in self._packages else ''}
    middlewareConfigHandler()
    staticConfigHandler()
"""
        script.append(main_script)

        # Write script content to .py
        with open(os.path.join(self._project_location, self._project_name, f"{self._project_name}.py"), "w") as f:
            f.write("\n".join(script))


    def run(self):
        self._initialize_scripts()
class CommandHandler:   
    from colorama import Fore, Style
    from pras.shell.helper import isvalidfile

    def __init__(self):
        from pras.cli import cli 
        import click
        
        self.cli = cli
        self._shell_commands = {
            'ls': self.ls,
            'cd': self.cd,
            'mkdir': self.mkdir,
            'rm': self.rm,
            'cp': self.cp,
            'mv': self.mv,
            'cat': self.cat,
            'touch': self.touch,
            'echo': self.echo,
            'clear': self.clear,
            'help': self.help
        }
        self._shell_command_details = dict(sorted({
            'clear': 'Clear terminal screen',
            'help': 'Show this help message',
            'exit | quit': 'Quit the shell',
            'cd': 'Change directory',
            'ls': 'List directory contents',
            'mkdir': 'Create a new directory',
            'rm': 'Remove a file or directory',
            'cp': 'Copy a file or directory',
            'mv': 'Move a file or directory',
            'cat': 'Display the contents of a file',
            'touch': 'Create a file if it does not exist',
            'echo': 'Display text on the screen',
        }.items(), key=lambda x: x[0]))
        self.ctx = click.Context(cli)
        self._global_command = cli.list_commands(self.ctx)

    
    def execute_command(self, command):
        import click
        import shlex
        
        command = shlex.split(command)

        cmd_name = command[0]
        if cmd_name == "shell":
            return
        if cmd_name in self._shell_commands:
            self._shell_commands[cmd_name](command[1:] if len(command) > 1 else [])
        elif cmd_name in self._global_command:
            try:
                self.cli.main(args=command, standalone_mode=False)
            except click.ClickException as e:
                    click.echo(f"pras: {cmd_name}: {e}")
        else:
            click.echo(f"pras: {cmd_name}: command not found.")

    def ls(self, args):
        import os
        from colorama import Fore, Style
        import click

        directory = os.path.abspath(args[0] if args else os.getcwd())
        try:
            files = os.listdir(directory)
            lis = []
            for file in files:
                file_path = os.path.join(directory, file)
                if file.startswith('.'):
                    # Hidden files
                    lis.append(f"{Style.BRIGHT}{Fore.LIGHTBLACK_EX}{file}{Style.RESET_ALL}")
                elif os.path.isdir(file_path):
                    # Directories
                    lis.append(f"{Style.BRIGHT}{Fore.BLUE}{file}{Style.RESET_ALL}")
                else:
                    # Regular files
                    lis.append(f"{Style.BRIGHT}{Fore.GREEN}{file}{Style.RESET_ALL}")
            click.echo('    '.join(lis))
        except Exception as e:
            click.echo(f"pras: ls: {e}")

    def cd(self, args):
        import click
        import os

        if args and args[0] == '-s':
            click.echo(f"{os.getcwd()}")
            return
        if args and args[0] == os.sep:
            args[0] = os.path.sep
        if args:
            try:
                os.chdir(os.path.abspath(args[0]))
            except Exception as e:
                click.echo(f"pras: cd: {e}")

    def mkdir(self, args):
        import os
        import click

        if args:
            try:
                os.makedirs(os.path.abspath(args[0]), exist_ok=True)
            except Exception as e:
                click.echo(f"pras: mkdir: {e}")

    def touch(self, args):
        import click
        import os
        from pras.shell.helper import isvalidfile

        if not args:
            click.echo("pras: touch: missing file operand")
            return

        # Separate flags and file names
        flags = [arg for arg in args if arg.startswith('-')]
        file_names = [arg for arg in args if not arg.startswith('-')]

        # Reconstruct the args list with the first item as the file name
        if not file_names:
            click.echo("pras: touch: missing file operand")
            return

        # Take the first filename and validate it
        file_path = os.path.abspath(file_names[0])
        isVal, msg = isvalidfile(file_names[0])
        if not isVal:
            click.echo(f"pras: touch: {msg}")
            return

        # Process flags
        # Check if any flags are invalid (you can expand the validation logic as needed)
        for flag in flags:
            if flag not in ['-f', '--force']:  # Add other valid flags here
                click.echo(f"pras: touch: invalid flag '{flag}'")
                return

        # Check if the file already exists
        file_exists = os.path.exists(file_path)
        if file_exists:
            if os.path.isfile(file_path):
                if '-f' in flags:
                    try:
                        os.remove(file_path)  # Remove the file if the force flag is provided
                        open(file_path, 'a').close()
                    except Exception as e:
                        click.echo(f"pras: touch: {e}")
                else:
                    click.echo(f"pras: touch: file '{file_names[0]}' already exists. use -f to overwrite.")
                    return
            else:
                click.echo(f"pras: touch: '{file_names[0]}' exists but is not a regular file.")
                return
        else:
            # Create the file if it does not exist
            try:
                open(file_path, 'a').close()
            except Exception as e:
                click.echo(f"pras: touch: {e}")
                

    def rm(self, args):
        import click
        import os
        import shutil

        if not args:
            click.echo("pras: rm: [option -r] [source] is required")
            return

        abs_path = os.path.abspath(args[1] if args[0] == '-r' and len(args) > 1 else args[0])

        if args[0] == '-r':
            if os.path.isdir(abs_path):
                try:
                    shutil.rmtree(abs_path)
                except Exception as e:
                    click.echo(f"pras: rm: failed to remove '{abs_path}': {e}")
            else:
                click.echo(f"pras: rm: '{abs_path}' is not a directory.")
        else:
            if os.path.isfile(abs_path):
                try:
                    os.remove(abs_path)
                except Exception as e:
                    click.echo(f"pras: rm: failed to remove '{abs_path}': {e}")
            elif os.path.isdir(abs_path):
                try:
                    os.rmdir(abs_path)
                except OSError:
                    click.echo(f"pras: rm: cannot remove '{abs_path}': Directory not empty")
                except Exception as e:
                    click.echo(f"pras: rm: failed to remove '{abs_path}': {e}")
            else:
                click.echo(f"pras: rm: cannot remove '{abs_path}': No such file or directory")

    def cp(self, args):
        import click
        import os
        import shutil

        if len(args) < 2:
            click.echo(f"pras: cp: [source] and [destination] are required.")
            return
        
        source = os.path.abspath(args[0])
        destination = os.path.abspath(args[1])

        if not os.path.exists(source):
            click.echo(f"pras: cp: Source '{source}' does not exist.")
            return

        try:
            if os.path.isdir(source):
                if os.path.exists(destination):
                    if os.path.isdir(destination):
                        # create a directory if it does not exist
                        source_dir = os.path.basename(source)
                        if not os.path.exists(os.path.join(destination, source_dir)):
                            os.makedirs(os.path.join(destination, source_dir))
                        # If the destination is a directory, copy contents into it
                        for item in os.listdir(source):
                            src_path = os.path.join(source, item)
                            dst_path = os.path.join(destination, source_dir, item)
                            # Copy the file or directory
                            if os.path.isdir(src_path):
                                shutil.copytree(src_path, dst_path, dirs_exist_ok=True)
                            else:
                                shutil.copy2(src_path, dst_path)
                    else:
                        click.echo(f"pras: cp: [destination] must be a directory.")
                else:
                    # If the destination does not exist, create it and copy the directory
                    shutil.copytree(source, destination)
            else:
                # Handle the case for files
                shutil.copy2(source, destination)
        except Exception as e:
            click.echo(f"pras: cp: {e}")


    def mv(self, args):
        import click
        import os
        import shutil

        if len(args) < 2:
            click.echo(f"pras: mv: [source] and [destination] are required.")
            return

        source = os.path.abspath(args[0])
        destination = os.path.abspath(args[1])

        if not os.path.exists(source):
            click.echo(f"pras: mv: Source '{source}' does not exist.")
            return

        try:
            if os.path.isdir(destination):
                destination = os.path.join(destination, os.path.basename(source))

            shutil.move(source, destination)
        except Exception as e:
            click.echo(f"Error occurred: {e}")

    def cat(self, args):
        import os
        import click

        if args:
            file_path = os.path.abspath(args[0])
            if os.path.isfile(file_path):
                try:
                    with open(file_path, 'r') as file:
                        click.echo(file.read())
                except Exception as e:
                    click.echo(f"pras: cat: {e}")
            else:
                click.echo(f"pras: cat: '{file_path}' is not a file.")

    def echo(self, args):
        import click

        click.echo(' '.join(args))

    def clear(self, args):
        import os
        import shutil
        import sys

        # Clear the terminal screen
        if os.name == 'nt':
            os.system('cls')
        else:
            if shutil.which('clear'):
                os.system('clear')
            else:
                sys.stdout.write("\033[2J\033[H")
                sys.stdout.flush()


    def help(self, args):
        from pras.cli import cli
        import click

        click.echo("Usage: [command] [arguments]\n")
        click.echo("Global commands:")
        
        for cmd_name in self._global_command:
            if cmd_name != "shell":
                cmd = cli.get_command(self.ctx, cmd_name)
                if cmd and cmd.help:
                    click.echo(f"   {cmd_name:15}{(cmd.help).split('.')[0]}.")
                elif cmd:
                    click.echo(f"   {cmd_name:15}")

        click.echo("\nShell commands:")
        for cmd_name, desc in self._shell_command_details.items():
            click.echo(f"   {cmd_name:15}{desc}.")

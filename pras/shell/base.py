from prompt_toolkit.completion import Completer

class CustomPathCompleter(Completer):
    """Custom completer for file path suggestions, even with prefixes like 'cd'."""
    def get_completions(self, document, complete_event):
        import re
        import os
        from prompt_toolkit.completion import Completion
        # Extract the text before the cursor
        text_before_cursor = document.text_before_cursor.strip()
        
        # Use regex to capture path after any command prefix, e.g., 'cd /'
        match = re.search(r'([./\\].*)$', text_before_cursor)
        
        # Proceed only if we have a valid path segment
        if match:
            path = match.group(1)
            dir_path = os.path.dirname(path) if os.path.dirname(path) else '.'
            base_name = os.path.basename(path)
            
            try:
                # List files and directories in the specified directory
                options = os.listdir(dir_path)
                # Filter options based on the path entered so far
                options = [
                    f"{option}" if ' ' in option and os.path.isdir(os.path.join(dir_path, option)) 
                    else f"{option}" if ' ' in option 
                    else f"{option}" if os.path.isdir(os.path.join(dir_path, option)) 
                    else option
                    for option in options if option.startswith(base_name)
                ]

                # Yield completions with corrected start_position
                for option in options:
                    yield Completion(option, start_position=-len(base_name))
            except Exception:
                pass




def shellHandler():
    from prompt_toolkit import PromptSession
    from prompt_toolkit.styles import Style
    import pras
    from pras.shell.cmd import CommandHandler
    import click
    import os
    from pras.shell.helper import get_os

    # Initialize the command handler
    command_handler = CommandHandler()
    command_handler.clear([])

    # Welcome message
    click.echo(f"{pras.CLI_NAME} {pras.__version__} on {get_os()}")
    click.echo("Type 'exit' or 'quit' to exit the shell. Type 'help' for available commands.")

    # Set tab completion
    session = PromptSession(completer=CustomPathCompleter(), complete_while_typing=True)

    style = Style.from_dict({
        'purple': '#4700c9',
        'red': '#ff0015',
        'green': '#28ed00 underline',
    })
    
    
    while True:
        try:
            os.environ["IN_INTERACTIVE_SHELL"] = "1"
            # Get current path for prompt
            rawPath = [pathElement for pathElement in os.getcwd().split(os.sep) if pathElement]
            path = f"/{rawPath[0]}{f'/{"." * (len(rawPath) - 2)}' if len(rawPath) > 2 else ''}/{rawPath[-1]}" if len(rawPath) > 1 else f"/{rawPath[0]}"

            prompt = [
        ('class:purple', f"\n┌──("),
        ('class:red', f"pras"),
        ('class:purple', f")-["),
        ('class:green', f"{path}"),
        ('class:purple', f"]\n└─"),
        ('class:red', f"# "),
    ]
            # Generate and display the prompt
            command = session.prompt(prompt, style=style).strip().split()
            
            # Expand home directory
            if len(command) > 1:
                for i, v in enumerate(command):
                    if v == '\\' or v == '~':
                        command[i] = '/'

            command = ' '.join(command)
            

            # Remove 'pras ' prefix
            if command.startswith("pras "):
                command = command[len("pras "):]

            # handle 'exit' and 'quit'
            if command in {"exit", "quit"}:
                click.echo("Bye!")
                break            
            
            
            # Execute command
            command_handler.execute_command(command)
            
            
        # Handle exceptions
        except Exception as e:
            if not command:
                pass
            else:
                # Just print the error without clearing input
                click.echo(f"pras: {e}")
        except KeyboardInterrupt:
            click.echo("\nBye!")
            break

        # Remove the IN_INTERACTIVE_SHELL environment variable
        finally:
            os.environ.pop("IN_INTERACTIVE_SHELL", None)
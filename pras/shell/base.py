def shellHandler():
    import readline
    import pras
    from pras.shell.cmd import CommandHandler
    import click
    import os
    from pras.shell.helper import completer, get_prompt, get_os

    # Initialize the command handler
    command_handler = CommandHandler()
    command_handler.clear([])

    # Welcome message
    click.echo(f"{pras.CLI_NAME} {pras.__version__} on {get_os()}")
    click.echo("Type 'exit' or 'quit' to exit the shell. Type 'help' for available commands.")

    # Set tab completion
    readline.set_completer(completer)
    readline.parse_and_bind("tab: complete")
    
    while True:
        try:
            os.environ["IN_INTERACTIVE_SHELL"] = "1"
            # Get current path for prompt
            rawPath = [pathElement for pathElement in os.getcwd().split(os.sep) if pathElement]
            path = f"/{rawPath[0]}{f'/{"." * (len(rawPath) - 2)}' if len(rawPath) > 2 else ''}/{rawPath[-1]}" if len(rawPath) > 1 else f"/{rawPath[0]}"

            # Generate and display the prompt
            prompt = get_prompt(path, 'pras')
            command = input(prompt).strip()
            command = command.split()

            # Expand home directory
            if len(command) > 1:
                for i, v in enumerate(command):
                    if v == '/':
                        command[i] = os.path.expanduser('~')

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
            
        except (KeyboardInterrupt, EOFError):
            click.echo("\nBye!")
            break
        # Handle exceptions
        except Exception as e:
            if not command:
                pass
            else:
                # Just print the error without clearing input
                click.echo(f"pras: {e}")

        # Remove the IN_INTERACTIVE_SHELL environment variable
        finally:
            os.environ.pop("IN_INTERACTIVE_SHELL", None)

def pras_cli(func):
    """Decorator to add a common template to all CLI commands."""
    import pras
    import functools
    import click
    import subprocess
    import os
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        # Print the shared header
        if os.getenv("IN_INTERACTIVE_SHELL") == "1":
            try:
                return func(*args, **kwargs)
            except (KeyboardInterrupt, EOFError):
                pass
        else:
            try:
                click.echo(f"\033[1;38;5;93m◆ {pras.CLI_NAME} v{pras.__version__}\033[0m\n")

                # Run the decorated function
                return func(*args, **kwargs)
            except KeyboardInterrupt:
                """Handle the Ctrl+C or Ctrl+D interrupt"""
                click.echo("\nBye!")

    return wrapper
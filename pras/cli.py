import click
from pras.helper import pras_cli


@click.group()
def cli():
    pass

@cli.command()
def version():
    import pras
    click.echo(pras.__version__)


@cli.command()
@click.option('-s', '--search', 'keyword', default=None, help='Keyword to search for specific devices in the network.')
@click.option('-l', '--loop', is_flag=True, help='Continuously search for the specified keyword until a match is found.')
@pras_cli
def netfetch(keyword, loop):
    """Scan network devices. If no keyword is provided, scan the entire network."""
    from pras.netfetch import netfetcher

    if not keyword:
        click.echo("Scanning entire network for all devices...")
    else:
        click.echo(f"Searching for devices with keyword: '{keyword}'")
    netfetcher(keyword, loop)


@cli.command()
@pras_cli
def django():
    """Create a new Django project."""
    from pras.django import creation_wizard

    creation_wizard()


@cli.command()
def shell():
    """Start an interactive shell to run commands directly."""
    from pras.shell import shellHandler

    shellHandler()



cli.add_command(netfetch)
cli.add_command(shell)
cli.add_command(django)
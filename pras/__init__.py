import json

with open("manifest.json") as f:
    manifest = json.load(f)

    __version__ = manifest["version"]

    CLI_NAME = manifest["name"]

    CLI_AUTHOR = manifest["author"]

    CLI_AUTHOR_EMAIL = manifest["author_email"]

    CLI_AUTHOR_LINK = manifest["author_url"]

    CLI_GITHUB_LINK = manifest["repository"]

    CLI_URL = manifest["homepage"]

    CLI_PURPLE = "\033[1;38;5;93m" 
    
    CLI_DESCRIPTION = manifest["description"]

    CLI_CREDIT = f'''"""
    ==========================
    PRAS CLI v{__version__}
    GitHub: {CLI_AUTHOR_LINK}
    ==========================
    """
    '''

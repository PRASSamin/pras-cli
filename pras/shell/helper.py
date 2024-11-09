def completer(text, state):
    import os
    import readline

    # Get the current input line buffer and split it by spaces
    full_input = readline.get_line_buffer().split()
    # Extract the last entered path element
    path = full_input[-1] if len(full_input) >= 2 else full_input[0]


    # If the path does not end with a separator, we are completing part of a name
    if not path.endswith(os.sep):
        try:
            # Find the directory part and the input to match
            dir_path = os.path.dirname(path)
            rm = os.path.basename(path)


            # List all entries in the directory
            options = os.listdir(dir_path)

            # Filter options based on the full text entered, allowing hyphens
            options = [
                f"{option}{os.sep}" if os.path.isdir(os.path.join(dir_path, option)) else option
                for option in options if option.startswith(rm)
            ]

            # Return the matched option based on the current state
            if state < len(options):
                matched_option = options[state]
                # Check if there's a hyphen in the last segment
                if '-' in rm:
                    # Remove everything before the last hyphen in the last segment
                    if rm.endswith('-'):
                        result = matched_option.replace(rm, '')
                    else:
                        x = rm.split('-')
                        del x[-1]
                        result = f"{'-'.join(x)}-"
                        result = matched_option.replace(result, '')
                else:
                    result = matched_option
                
                return result

        except Exception as e:
            return None
            
    else:
        # If the path ends with a separator, return directory contents
        try:
            options = os.listdir(path)
            options = [
                f"{option}{os.sep}" if os.path.isdir(os.path.join(path, option)) else option
                for option in options if option.startswith(text)
            ]
            if state < len(options):
                return options[state]
            else:
                return None
        except Exception as e:
            return None



def get_prompt(path, cli_name):
    """Generate a command prompt with color formatting."""
    from colorama import Fore, Style
    import pras
    prompt = (
        f"\n{pras.CLI_PURPLE}┌──({Fore.RED}{cli_name}{Style.RESET_ALL}{pras.CLI_PURPLE})-[{Fore.LIGHTGREEN_EX}{path}{pras.CLI_PURPLE}{Style.RESET_ALL}{pras.CLI_PURPLE}]{Style.RESET_ALL}\n└─❯ "
    )
    return prompt

def get_os():
    import platform
    import os
    import sys
    import os
    from pras.django.helper.utils import freedesktop_os_release

    if os.name == 'nt':
        version = platform.version()
        system = platform.system()
        release = platform.release()
        return f'{system} {release} {version}'
    elif os.name == 'posix':
        if sys.platform == 'darwin':
            return f'MacOS({platform.mac_ver()[0]})'
        else:
            return f'Linux({freedesktop_os_release()["PRETTY_NAME"]})'
    else:
        return 'Unknown'


def isvalidfile(filename):
    import re
    import os
    # Check if filename is empty
    if not filename:
        return False, "filename is empty."

    # Check for invalid characters
    forbidden_characters = r'[<>:"/\\|?*]'
    if re.search(forbidden_characters, filename):
        return False, "filename contains invalid characters"

    # Check if filename exceeds system limits
    if len(filename) > 255:  # Typical limit for most file systems
        return False, "filename exceeds maximum length of 255 characters."

    # Check for path length (optional, can adjust based on requirements)
    full_path = os.path.abspath(filename)
    if len(full_path) > 260:  # Typical limit for Windows
        return False, "full path exceeds maximum length of 260 characters."

    # If all checks passed, filename is valid and can be created
    return True, "filename is valid and can be created."
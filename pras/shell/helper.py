from prompt_toolkit.completion import Completer

class PathCompleter(Completer):
    """completer for file path suggestions, even with prefixes like 'cd'."""
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
# django -> helper -> validator.py
from prompt_toolkit.validation import Validator, ValidationError
from InquirerPy.validator import PathValidator


__all__ = [
    "NameValidator",
    "AppNameValidator",
    "PathValidatorPlus"
]

class NameValidator(Validator):
    from pathlib import Path
    """
    Validate project name:
    - Name cannot be empty
    - Name cannot contain special characters except '_'
    - Name cannot contain spaces
    - Name cannot start with a number
    """

    def __init__(self, message: dict = {
        "empty": "Project name cannot be empty",
    }):
        import re
        self._message = message
        self._name_pattern = r"^[a-zA-Z_][a-zA-Z0-9_]*$"
        self._re = re.compile(self._name_pattern)

    def check_invalid_char(self, name):
        """This method checks for invalid characters"""
        for char in name:
            if not char.isalnum() and char != '_':
                if char == ' ':
                    return 'space'  
                return char
        return None  

    def validate(self, document):
        """Validate project name:"""
        name = document.text
        cursor_position = document.cursor_position
        
        if name and not self._re.match(name):  
            """Check is the name follows the pattern"""
            invalid_char = self.check_invalid_char(name)
            if name[0].isdigit():  
                """Check if the name starts with a number"""
                raise ValidationError(
                    message="Project name cannot start with a number",
                    cursor_position=cursor_position
                )
            raise ValidationError(
                message=f"Project name cannot contain {invalid_char}",
                cursor_position=cursor_position
            )
        
        return None  # Validation succeeded


class AppNameValidator(NameValidator):
    """
    Validate app name:
    - App name cannot be empty
    - App name cannot contain special characters except '_'
    - App name cannot contain spaces
    - App name cannot start with a number
    - App name cannot be the same as the project name
    """

    def __init__(self, message: dict = {
        "empty": "App name cannot be empty",
    }, project_name: str = ""):
        super().__init__(message)
        import re
        self._app_pattern = r"^[a-zA-Z_][a-zA-Z0-9_]*$"
        self._project_name = project_name
        self._re = re.compile(self._app_pattern)

    def validate(self, document):
        """Validate app name:"""
        name = document.text
        cursor_position = document.cursor_position
        if name == self._project_name:
            raise ValidationError(
                message="App name cannot be the same as the project name",
                cursor_position=cursor_position
            )
        if name and not self._re.match(name):  # Check if the name follows the pattern
            invalid_char = self.check_invalid_char(name)
            if name[0].isdigit():
                raise ValidationError(
                    message="App name cannot start with a number",
                    cursor_position=cursor_position
                )
            raise ValidationError(
                message=f"App name cannot contain {invalid_char}",
                cursor_position=cursor_position
            )
        return super().validate(document)
    
class PathValidatorPlus(PathValidator):
    def __init__(self, message: str = "Input is not a valid path", is_file: bool = False, is_dir: bool = False, project_name: str = ""):
        self._project_name = project_name

        super().__init__(message, is_file, is_dir)
    def validate(self, document) -> None:
        from pathlib import Path
        import os


        path = Path(document.text).expanduser()
        if os.path.exists(os.path.join(path, self._project_name)):
            raise ValidationError(
                message="Project name already exists",
                cursor_position=document.cursor_position
                )
        return super().validate(document=document)
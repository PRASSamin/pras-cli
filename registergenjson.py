import os

this = os.path.dirname(os.path.abspath(__file__))

REGISTERED_PATHS = [
    {
        "path": f"{this}/src/app/docs/commands", 
        "json_file": "commands.json"
    }
]

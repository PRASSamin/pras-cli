import os
import json
absPath = os.path.abspath("manifest.json")

with open(absPath, "r") as f:
    manifest = json.load(f)
    __version__ = manifest["version"]

__all__ = ["__version__"]
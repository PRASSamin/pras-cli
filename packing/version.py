import os

absPath = os.path.abspath("pras/__init__.py")

with open(absPath, "r") as f:
    for line in f.readlines():
        if line.startswith("__version__"):
            __version__ = line.strip().split()[-1][1:-1]
            break

__all__ = ["__version__"]
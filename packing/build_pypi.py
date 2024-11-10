# packing -> build_pypi.py
from version import __version__ as VERSION
import subprocess
import sys
import os

try:
    print("Building version $VERSION")

    OUTPUT_DIR=f"./builds/pypi/v{VERSION}"

    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR, exist_ok=True)

    subprocess.run([sys.executable, "setup.py", "sdist", "--dist-dir", OUTPUT_DIR, "bdist_wheel", "--dist-dir", OUTPUT_DIR])

    print(f"Build successful. Files are in {OUTPUT_DIR}")
except Exception as e:
    print("Build failed. Check the errors above. \n Error: " + str(e))

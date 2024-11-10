import os
import sys
import shutil
import subprocess

sep = os.sep
# Check if build and dist folders exist and are not empty
if (os.path.exists(f".{sep}build") and len(os.listdir(f".{sep}build")) > 0) or (os.path.exists(f".{sep}dist") and len(os.listdir(f".{sep}dist")) > 0):
    # Check if old version is provided as an argument
    if len(sys.argv) == 1:
        print("Usage: python build_pyi.py <old_version>")
        exit(1)
        
    old_version = sys.argv[1]
    backup_build_folder = f".{sep}old_build{sep}{old_version}"

    # Ensure the backup build folder has a unique name if it already exists
    version = 1
    while os.path.exists(f"{backup_build_folder}-{version}"):
        version += 1
    backup_build_folder = f"{backup_build_folder}-{version}"

    # Create the backup directory
    os.makedirs(backup_build_folder, exist_ok=True)

    # Move the current build and dist directories to the backup directory
    if os.path.exists(f".{sep}build"):
        shutil.move(f".{sep}build", backup_build_folder)
    if os.path.exists(f".{sep}dist"):
        shutil.move(f".{sep}dist", backup_build_folder)

    print(f"Moved existing build and dist folders to {backup_build_folder}")
else:
    print("No existing build or dist folders found, or they are empty. Skipping backup.")

# Run the pyinstaller build
result = subprocess.run(["pyinstaller", "pras.spec"])

# Check if pyinstaller ran successfully
if result.returncode != 0 or not (os.path.exists(f".{sep}dist") and os.path.exists(f".{sep}build")):
    print("Build failed. Check the errors above.")
    exit(1)
else:
    print("Build successful. New files are in ./dist and ./build")

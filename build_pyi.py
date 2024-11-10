import os
import sys
import subprocess
import shutil

sep = os.sep

def backup_and_build(old_version):
    if (os.path.exists(f".{sep}build") and len(os.listdir(f".{sep}build")) > 0) or (os.path.exists(f".{sep}dist") and len(os.listdir(f".{sep}dist")) > 0):
        print("Build and dist folders are not empty. Backing up...")
        backup_build_folder = f"./old_build/{old_version}"

        if os.path.exists(backup_build_folder):
            version = 1
            while os.path.exists(f"{backup_build_folder}-{version}"):
                version += 1
            backup_build_folder = f"{backup_build_folder}-{version}"

        os.makedirs(backup_build_folder, exist_ok=True)
        shutil.move(f"./build{sep}", f"{backup_build_folder}{sep}", ignore_errors=True)
        shutil.move(f"./dist{sep}", f"{backup_build_folder}{sep}", ignore_errors=True)
        print(f"Moved existing build and dist folders to {backup_build_folder}")
    else:
        print("No existing build or dist folders found, or they are empty. Skipping backup.")

    # Run PyInstaller
    subprocess.run(['pyinstaller', './pras.spec'], check=True)
    if os.path.exists(f"./build{sep}") and os.path.exists(f"./dist{sep}"):
        print("Build successful. Files are in ./dist and ./build folder")

def run_packaging():
    print("="*50)
    print("Packaging")
    print("="*50)
    subprocess.run([sys.executable, "packing.py"], check=True)

if __name__ == "__main__":
    # Parsing arguments
    if len(sys.argv) < 3 or sys.argv[1] != "--m" or sys.argv[2] not in ["pack", "full"]:
        print("Usage: python build_pyi.py --m [pack|full] --v <old_version>")
        sys.exit(1)

    mode = sys.argv[2]
    old_version = sys.argv[4] if len(sys.argv) > 4 else None

    if mode == "pack":
        print("Running in 'pack' mode. Executing packaging script only.")
        run_packaging()
    elif mode == "full":
        if (os.path.exists(f".{sep}build") and len(os.listdir(f".{sep}build")) > 0) or (os.path.exists(f".{sep}dist") and len(os.listdir(f".{sep}dist")) > 0):
            if old_version is None:
                print("Please provide an old version with --v for full mode.")
            sys.exit(1)
        print("Running in 'full' mode. Performing backup, build, and packaging.")
        backup_and_build(old_version)
        run_packaging()

# packing -> build_deb.py
from version import __version__ as VERSION
import subprocess
import os
import shutil
import glob
import json

try:
    print(f"Building version {VERSION}")

    OUTPUT_DIR = f"./builds/linux/v{VERSION}"

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    with open("manifest.json", "r") as f:
        manifest = json.load(f)

    subprocess.run([
        "fpm", "-s", "dir", "-t", "deb",
        "-n", "pras-cli", "-v", VERSION,
        "--prefix", "/usr/local/bin", 
        "--description", manifest["description"],
        "--url", manifest["homepage"],
        "--maintainer", f"{manifest['author']} <{manifest['author_email']}>",
        "--license", manifest["license"],
        "dist/pras-cli=pras"
    ], check=True)


    for deb_file in glob.glob("*.deb"):
        shutil.move(deb_file, OUTPUT_DIR)
        print(f"Debian package created at {OUTPUT_DIR}/{deb_file}")

except subprocess.CalledProcessError as e:
    print("Build failed during the fpm packaging step. Error:\n" + str(e))
except Exception as e:
    print("Build failed. Check the errors above.\nError: " + str(e))

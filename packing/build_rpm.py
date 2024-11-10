# packing -> build_rpm.py
from version import __version__ as VERSION
import subprocess
import os
import shutil
import glob

try:
    print(f"Building version {VERSION}")
    SPEC_FILE = "pras-cli.rpm.spec"
    RPM_BUILD_DIR = f"{os.path.expanduser('~')}/rpmbuild/RPMS/x86_64"
    OUTPUT_DIR = f"./builds/linux/v{VERSION}"
    RPM_FILE = f"pras-cli-{VERSION}-1.x86_64.rpm"

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Build the RPM package
    print("Building RPM package...")
    subprocess.run(["rpmbuild", "-ba", SPEC_FILE], check=True)

    # Move the RPM package to the output directory if it exists
    rpm_path = os.path.join(RPM_BUILD_DIR, RPM_FILE)
    if os.path.exists(rpm_path):
        shutil.move(rpm_path, OUTPUT_DIR)
        print(f"RPM package created at {OUTPUT_DIR}/{RPM_FILE}")
    else:
        print("RPM package not found in the expected directory. Build may have failed.")

except subprocess.CalledProcessError as e:
    print("Build failed during the RPM or Debian packaging step. Error:\n" + str(e))
except Exception as e:
    print("Build failed. Check the errors above.\nError: " + str(e))

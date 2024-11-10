import subprocess
import sys

try:
    subprocess.run([sys.executable, './packing/build_pypi.py'], check=True)
    subprocess.run([sys.executable, './packing/build_deb.py'], check=True)
    subprocess.run([sys.executable, './packing/build_rpm.py'], check=True)
except subprocess.CalledProcessError as e:
    print("Build failed during one of the packaging steps. Error:\n", e)
except Exception as e:
    print("Build failed. Check the errors above.\nError:", e)

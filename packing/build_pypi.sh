#!/bin/bash

# Extract version from pras/__init__.py
VERSION=$(grep -oP "(?<=^__version__ = [\"'])[^\"']+" ./pras/__init__.py)

if [ -z "$VERSION" ]; then
    echo "Version not found in pras/__init__.py"
    exit 1
else
    echo "Building version $VERSION"
fi

OUTPUT_DIR="./builds/pypi/v$VERSION"

mkdir -p "$OUTPUT_DIR"

python setup.py sdist --dist-dir "$OUTPUT_DIR" bdist_wheel --dist-dir "$OUTPUT_DIR"

if [ $? -eq 0 ]; then
    echo "Build successful. Files are in $OUTPUT_DIR"
else
    echo "Build failed. Check the errors above."
fi

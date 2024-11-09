#!/bin/bash
# Extract version from pras/__init__.py
VERSION=$(grep -oP "(?<=^__version__ = [\"'])[^\"']+" ./pras/__init__.py)

if [ -z "$VERSION" ]; then
  echo "Version not found in pras/__init__.py"
  exit 1
else
  echo "Building version $VERSION"
fi

# Ensure builds/linux directory exists
BUILD_DIR="builds/linux/v${VERSION}"
mkdir -p "$BUILD_DIR"


# Run the fpm command to build the Debian package
# Modify the --prefix flag to match your desired installation directory
fpm -s dir -t deb -n pras-cli -v "$VERSION" --prefix /usr/local/bin dist/pras-cli=pras

# Move the created .deb file to the builds/linux directory
mv *.deb "$BUILD_DIR/"

echo "Debian package created at $BUILD_DIR/prascli_${VERSION}.deb"

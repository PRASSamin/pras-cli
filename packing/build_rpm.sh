#!/bin/bash

# Extract version from pras/__init__.py
VERSION=$(grep -oP "(?<=^__version__ = [\"'])[^\"']+" ./pras/__init__.py)

if [ -z "$VERSION" ]; then
  echo "Version not found in pras/__init__.py"
  exit 1
else
  echo "Building version $VERSION"
fi


# Define variables
SPEC_FILE="pras-cli.rpm.spec"
RPM_BUILD_DIR=~/rpmbuild/RPMS/x86_64
BUILD_DIR=./builds/linux/v"$VERSION"
RPM_FILE="pras-cli-$VERSION-1.x86_64.rpm"

# Ensure the destination directory exists
mkdir -p "$BUILD_DIR"

# Build the RPM package
rpmbuild -ba "$SPEC_FILE"

# Check if the RPM was built successfully
if [ $? -eq 0 ]; then
    echo "RPM build successful."
    # Move the RPM to the builds directory
    mv "$RPM_BUILD_DIR/$RPM_FILE" "$BUILD_DIR/"
    echo "RPM moved to $BUILD_DIR"
else
    echo "RPM build failed."
    exit 1
fi

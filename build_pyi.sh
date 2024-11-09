#!/bin/bash

# Check if build and dist folders exist and are not empty
if { [ -d ./build ] && [ "$(ls -A ./build)" ]; } || { [ -d ./dist ] && [ "$(ls -A ./dist)" ]; }; then
    # Check if old version is provided as an argument
    if [ -z "$1" ]; then
        echo "Usage: $0 <old_version>"
        exit 1
    fi

    old_version=$1
    backup_build_folder="./old_build/${old_version}"

    # Ensure the backup build folder has a unique name if it already exists
    if [ -d "$backup_build_folder" ]; then
        version=1
        while [ -d "${backup_build_folder}-${version}" ]; do
            version=$((version + 1))
        done
        backup_build_folder="${backup_build_folder}-${version}"
    fi

    # Create the backup directory
    mkdir -p "$backup_build_folder"

    # Move the current build and dist directories to the backup directory
    mv ./build "$backup_build_folder/" 2>/dev/null
    mv ./dist "$backup_build_folder/" 2>/dev/null
    echo "Moved existing build and dist folders to $backup_build_folder"
else
    echo "No existing build or dist folders found, or they are empty. Skipping backup."
fi

# Run the pyinstaller build
pyinstaller ./pras.spec

# Check if pyinstaller ran successfully
if [ $? -eq 0 ]; then
    echo "Build successful. New files are in ./dist and ./build"

    echo "====================="
    echo "packaging"
    echo "====================="
    ./packing.sh
else
    echo "Build failed. Check the errors above."
fi


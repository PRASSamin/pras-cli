import os
import json
import re
from datetime import datetime
from registergenjson import REGISTERED_PATHS

def extract_p_after_h1(file_path):
    """
    Extracts the content of the first <p> tag that comes after the first <h1> tag.
    Removes all HTML tags and returns plain text.
    """
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()
            # Match the first <h1> tag and everything up to the first <p> tag
            match = re.search(r"<h1[^>]*>.*?<\/h1>.*?<p[^>]*>(.*?)<\/p>", content, re.DOTALL)
            if match:
                p_content = match.group(1)
                # Remove any inner HTML tags from the <p> content
                clean_content = re.sub(r"<[^>]+>", "", p_content).strip()
                return clean_content
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    return None

def get_pathname(file_path):
    """
    Converts a file path to a Next.js pathname.
    
    :param file_path: The full file path.
    :return: The Next.js pathname.
    """
    
    app_root = f"{os.getcwd()}{os.sep}src{os.sep}app"

    # Ensure paths use consistent separators
    file_path = os.path.normpath(file_path)
    app_root = os.path.normpath(app_root)

    # Remove the app_root portion
    if file_path.startswith(app_root):
        relative_path = file_path[len(app_root):]
    else:
        raise ValueError("The file path is not inside the app root directory.")

    # Convert the relative path to a URL-like structure
    pathname = relative_path.replace(os.sep, "/").strip("/")
    
    # Remove file extension and default 'page.jsx' if necessary
    if pathname.endswith("page.jsx"):
        pathname = os.path.dirname(pathname)  # Exclude 'page.jsx' from the path

    return f"/{pathname}"

def scan_directory_and_generate_json(path, json_file):
    """
    Traverse the directory tree and create a JSON file with page metadata.
    """
    data = []

    for root, _, files in os.walk(path):
        # Look for page.jsx and view.jsx files
        page_file = os.path.join(root, "page.jsx")
        view_file = os.path.join(root, "view.jsx")

        if os.path.exists(page_file):
            created_time = os.path.getctime(page_file) 
            description = None

            # Extract description from view.jsx or page.jsx
            if os.path.exists(view_file):
                description = extract_p_after_h1(view_file)  # Try view.jsx first
            if not description:
                description = extract_p_after_h1(page_file)  # Fallback to page.jsx

            record = {
                "pathname": get_pathname(page_file), 
                "title": os.path.basename(root),
                "description": description or "No description available",
                "created_at": datetime.fromtimestamp(created_time).isoformat(),
                "created_time": created_time,  
            }
            data.append(record)

    # Sort data by creation time (latest first)
    data.sort(key=lambda x: x["created_time"], reverse=True)

    # Add IDs after sorting (latest gets the highest ID)
    for idx, record in enumerate(data, start=1):
        record["id"] = idx
        del record["created_time"]  # Remove timestamp as it's not needed in the final JSON

    # Ensure the `public/` folder exists
    public_folder = os.path.join(os.getcwd(), "public")
    os.makedirs(public_folder, exist_ok=True)

    # Write the collected metadata to the JSON file in the `public/` folder
    json_output_path = os.path.join(public_folder, json_file)
    with open(json_output_path, "w") as outfile:
        json.dump(data, outfile, indent=4)
    print(f"Generated {json_output_path} with {len(data)} entries.")

if __name__ == "__main__":
    for item in REGISTERED_PATHS:
        directory = item["path"]
        output_file = item["json_file"]
        if os.path.exists(directory):
            scan_directory_and_generate_json(directory, output_file)
        else:
            print(f"Directory not found: {directory}")

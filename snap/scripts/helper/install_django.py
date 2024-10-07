import os
import sys
import argparse
import importlib

def add_app_to_installed_apps(prj_name, app_name, settings_file):
    settings = importlib.import_module(f"{prj_name}.settings")

    updated_installed_apps = settings.INSTALLED_APPS
    if not app_name in settings.INSTALLED_APPS:
        updated_installed_apps = settings.INSTALLED_APPS + [app_name]

    try:
        with open(settings_file, 'r') as f:
            lines = f.readlines()
    except Exception as e:
        print(f"Error reading {settings_file}: {e}")
        return

    for line_num, line in enumerate(lines):
        if line.strip().startswith('INSTALLED_APPS'):
            start = line_num
            while line_num < len(lines) and not lines[line_num].strip().startswith(']'):
                line_num += 1
            del lines[start:line_num + 1]
            break


    new_installed_apps_str = f"INSTALLED_APPS = [\n    " + ",\n    ".join(f"'{app}'" for app in updated_installed_apps) + "\n]\n"


    lines.insert(start, new_installed_apps_str)

    with open(settings_file, 'w') as f:
        f.writelines(lines)



def add_template_dir(prj_name, template_dir, settings_file):
    settings = importlib.import_module(f"{prj_name}.settings")

    tem = settings.TEMPLATES[0]['DIRS']
    if not os.path.exists(settings_file):
        print(f"Error: {settings_file} does not exist.")
        sys.exit(1)

    with open(settings_file, 'r') as f:
        lines = f.readlines()

    os_import_present = any('import os' in line for line in lines)

    if not os_import_present:
        for line_num, line in enumerate(lines):
            if line.strip().startswith('from pathlib import Path'):
                lines.insert(line_num + 1, 'import os\n')
                break

    for line_num, line in enumerate(lines):
        if line.strip().startswith('TEMPLATES'):
            for inner_line_num in range(line_num, len(lines)):
                if 'DIRS' in lines[inner_line_num]:
                    if len(tem) == 0:
                        lines[inner_line_num] = lines[inner_line_num].replace(
                            ']', f"os.path.join(BASE_DIR, '{template_dir}')]"
                        )
                        break
            break

    with open(settings_file, 'w') as f:
        f.writelines(lines)


def main():
    parser = argparse.ArgumentParser(description="Update Django settings with app and template directory.")

    parser.add_argument('--p', required=True, help="Project name (mandatory)")
    parser.add_argument('--a', required=False, help="App name to be added to INSTALLED_APPS (optional)")
    parser.add_argument('--t', required=False, help="Template directory to be added to TEMPLATES (optional)")

    args = parser.parse_args()

    prj_name = args.p
    app_name = args.a
    template_dir = args.t

    current_dir = os.path.dirname(os.path.abspath(__file__))
    settings_file = os.path.join(current_dir, prj_name, 'settings.py')

    if app_name:
        add_app_to_installed_apps(prj_name, app_name, settings_file)

    if template_dir:
        add_template_dir(prj_name, template_dir, settings_file)

    os.remove(__file__)

if __name__ == "__main__":
    main()

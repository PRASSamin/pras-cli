SCRIPT = r"""
def appConfigHandler():
    prj_name = config.get('project_name')
    app_name = config.get('app_name')
    packages = config.get('packages', [])

    try:
        # Import settings module and get the settings file path
        settings = importlib.import_module(f"{prj_name}.settings")
        settings_file = os.path.join(os.getcwd(), prj_name, 'settings.py')

        # Collect apps to add
        new_apps = {app_name}
        if 'djangorestframework' in packages:
            new_apps.add('rest_framework')
        if 'django-cors-headers' in packages:
            new_apps.add('corsheaders')

        # Add new apps if they aren't in INSTALLED_APPS
        updated_installed_apps = list(settings.INSTALLED_APPS) + \
                                 [app for app in new_apps if app not in settings.INSTALLED_APPS]

        # Read the settings file
        with open(settings_file, 'r') as f:
            lines = f.readlines()

        # Find INSTALLED_APPS section and replace it
        start = None
        for line_num, line in enumerate(lines):
            if line.strip().startswith('INSTALLED_APPS'):
                start = line_num
                while line_num < len(lines) and not lines[line_num].strip().startswith(']'):
                    line_num += 1
                del lines[start:line_num + 1]
                break

        if start is None:
            return False

        # Create the updated INSTALLED_APPS string and insert it
        new_installed_apps_str = "INSTALLED_APPS = [\n    " + \
                                 ",\n    ".join(f"'{app}'" for app in updated_installed_apps) + \
                                 "\n]\n"
        lines.insert(start, new_installed_apps_str)

        # Write updated settings to the settings file
        with open(settings_file, 'w') as f:
            f.writelines(lines)

        # Modify the project's urls.py file
        global_url_file = os.path.join(os.getcwd(), prj_name, 'urls.py')

        with open(global_url_file, 'r') as f:
            lines = f.readlines()

        # Insert credits at the top if not already present
        if not any("PRAS CLI" in line for line in lines):
            lines.insert(0, credits)

        # Ensure 'include' is in the django.urls import if necessary
        for line_num, line in enumerate(lines):
            if line.strip() == 'from django.urls import path':
                lines[line_num] = 'from django.urls import path, include\n'
            if line.strip() == 'urlpatterns = [':
                lines.insert(line_num + 1, f'    path("", include("{app_name}.urls")),\n')
                break

        # Write updated urls.py
        with open(global_url_file, 'w') as f:
            f.writelines(lines)

        # Copy urls.py to the app's directory
        shutil.copyfile(global_url_file, os.path.join(os.getcwd(), app_name, 'urls.py'))

        # Modify the app's urls.py file
        app_url_file = os.path.join(os.getcwd(), app_name, 'urls.py')

        with open(app_url_file, 'r') as f:
            lines = f.readlines()

        # Remove 'include' from imports and ensure urlpatterns is correctly formatted
        for line_num, line in enumerate(lines):
            if line.startswith('from django.urls import path, include'):
                lines[line_num] = 'from django.urls import path\n'
            if line.strip() == 'urlpatterns = [':
                # Ensure empty urlpatterns
                line_num += 1
                while line_num < len(lines) and lines[line_num].strip() != ']':
                    del lines[line_num]
                if lines[line_num].strip() == ']':
                    del lines[line_num]
                    lines.insert(line_num, '\n]')

        # Write modified app urls.py
        with open(app_url_file, 'w') as f:
            f.writelines(lines)

        return True

    except Exception as e:
        return False
"""
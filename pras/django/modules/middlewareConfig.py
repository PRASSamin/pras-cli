SCRIPT = r'''
def middlewareConfigHandler():
    prj_name = config.get('project_name')
    packages = config.get('packages', [])

    try:
        # Import settings module and get the settings file path
        settings = importlib.import_module(f"{prj_name}.settings")
        settings_file = os.path.join(os.getcwd(), prj_name, 'settings.py')

        # Define middleware to add based on selected packages
        cors_middleware = 'corsheaders.middleware.CorsMiddleware'
        whitenoise_middleware = 'whitenoise.middleware.WhiteNoiseMiddleware'

        # Read the settings file
        with open(settings_file, 'r') as f:
            lines = f.readlines()

        if not any("PRAS CLI" in line for line in lines):
            lines.insert(0, credits)

        # Find MIDDLEWARE section
        start = None
        end = None
        for line_num, line in enumerate(lines):
            if line.strip().startswith('MIDDLEWARE'):
                start = line_num
                while line_num < len(lines) and not lines[line_num].strip().startswith(']'):
                    line_num += 1
                end = line_num
                break

        if start is None or end is None:
            return False

        # Extract current MIDDLEWARE as a list of strings for easier modification
        current_middleware = [
            line.strip().strip(',').strip("'").strip('"') for line in lines[start + 1:end]
            if line.strip() and line.strip() != '[' and line.strip() != ']'
        ]

        # Check if middleware items are already present
        cors_present = cors_middleware in current_middleware
        whitenoise_present = whitenoise_middleware in current_middleware

        # Insert corsheaders.middleware.CorsMiddleware before CommonMiddleware if package is included
        if 'django-cors-headers' in packages and not cors_present:
            try:
                common_index = current_middleware.index('django.middleware.common.CommonMiddleware')
                current_middleware.insert(common_index, cors_middleware)
            except ValueError:
                current_middleware.insert(0, cors_middleware)

        # Insert whitenoise.middleware.WhiteNoiseMiddleware after SecurityMiddleware if package is included
        if 'whitenoise' in packages and not whitenoise_present:
            try:
                security_index = current_middleware.index('django.middleware.security.SecurityMiddleware')
                current_middleware.insert(security_index + 1, whitenoise_middleware)
            except ValueError:
                current_middleware.insert(0, whitenoise_middleware)

        # Rewrite the MIDDLEWARE section in the settings file
        new_middleware_str = "MIDDLEWARE = [\n    " + \
                             ",\n    ".join(f"'{mw}'" for mw in current_middleware) + \
                             "\n]\n"
        lines[start:end + 1] = [new_middleware_str]  # Replace MIDDLEWARE section

        # Write the updated settings back to the file
        with open(settings_file, 'w') as f:
            f.writelines(lines)

        return True

    except Exception as e:
        return False
'''
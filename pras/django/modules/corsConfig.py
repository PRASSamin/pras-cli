SCRIPT = r'''
def corsConfigHandler():
    prj_name = config.get('project_name')
    packages = config.get('packages', [])

    if 'django-cors-headers' not in packages:
        return False
    corsConfig = """CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGINS = [
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:8000",
    "http://127.0.0.1:8000"
]

CORS_ALLOW_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
CORS_ALLOW_HEADERS = [
    'Authorization',
    'Content-Type',
    'X-CSRFToken',  
]
"""
    try:
        # Import settings module and get the settings file path
        settings = importlib.import_module(f"{prj_name}.settings")
        settings_file = os.path.join(os.getcwd(), prj_name, 'settings.py')

        # Read the settings file
        with open(settings_file, 'r') as f:
            lines = f.readlines()

        if not any("PRAS CLI" in line for line in lines):
            lines.insert(0, credits)

        # Find MIDDLEWARE section
        lines.insert(len(lines), corsConfig)

        # Write the updated settings back to the file
        with open(settings_file, 'w') as f:
            f.writelines(lines)

        return True
    except Exception as e:
        return  
'''
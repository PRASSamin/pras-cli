SCRIPT = r'''
def dbConfigHandler():
    prj_name = config.get('project_name')
    db_config = config.get('db_config')
    orm = config.get('orm')
    packages = config.get('packages', [])

    try:
        if 'pymysql' in packages:
            initfile = os.path.join(os.getcwd(), prj_name, '__init__.py')

            with open(initfile, 'r') as f:
                lines = f.readlines()

            if not any("PRAS CLI" in line for line in lines):
                lines.insert(0, credits)
            
            lines.insert(len(lines), '\nimport pymysql\n')
            lines.insert(len(lines), 'pymysql.install_as_MySQLdb()\n')

            with open(initfile, 'w') as f:
                f.writelines(lines)
                
        # Import settings module and get the settings file path
        settings = importlib.import_module(f"{prj_name}.settings")
        settings_file = os.path.join(os.getcwd(), prj_name, 'settings.py')

        db_count = str(settings.DATABASES).count('}')

        # Read the settings file
        with open(settings_file, 'r') as f:
            lines = f.readlines()

        if not any("PRAS CLI" in line for line in lines):
            lines.insert(0, credits)

        # Locate DATABASES section
        start = None
        end = None
        for line_num, line in enumerate(lines):
            if line.strip().startswith('DATABASES'):
                start = line_num
                while line_num < len(lines) and not lines[line_num].strip().startswith('}'):
                    line_num += 1
                end = line_num + (db_count - 1)
                break

        if start is None or end is None:
            return False

        # Build database configuration strings based on ORM
        if orm.lower() == 'django':
            # Generate default Django database configuration
            new_db_str = f"""DATABASES = {{
    'default': {{
        'ENGINE': '{db_config["ENGINE"]}',
        'NAME': '{db_config["NAME"]}',
        'USER': '{db_config["USER"]}',
        'PASSWORD': '{db_config["PASSWORD"]}',
        'HOST': '{db_config["HOST"]}',
        'PORT': '{db_config["PORT"]}',
    }}
}}\n"""
            
            lines[start:end + (db_count - 1)] = [new_db_str]

        elif orm.lower() == 'sqlalchemy':
            # Generate SQLAlchemy configuration alongside default Django settings
            new_db_str = f"""DATABASES = {{
    'default': {{
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }},
    'sqlalchemy': '{db_config}'
}}\n"""
            
            lines[start:end + db_count] = [new_db_str]

        else:
            return False


        # Write the updated settings back to the file
        with open(settings_file, 'w') as f:
            f.writelines(lines)

        return True

    except Exception as e:
        return False
'''
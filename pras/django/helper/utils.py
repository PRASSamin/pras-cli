# django -> helper -> utils.py

_os_release_candidates = ("/etc/os-release", "/usr/lib/os-release")
_os_release_cache = None

# functionality collected from platform module latest version
def _parse_os_release(lines):
    # These fields are mandatory fields with well-known defaults
    # in practice all Linux distributions override NAME, ID, and PRETTY_NAME.
    import re
    
    info = {
        "NAME": "Linux",
        "ID": "linux",
        "PRETTY_NAME": "Linux",
    }

    # NAME=value with optional quotes (' or "). The regular expression is less
    # strict than shell lexer, but that's ok.
    os_release_line = re.compile(
        "^(?P<name>[a-zA-Z0-9_]+)=(?P<quote>[\"\']?)(?P<value>.*)(?P=quote)$"
    )
    # unescape five special characters mentioned in the standard
    os_release_unescape = re.compile(r"\\([\\\$\"\'`])")

    for line in lines:
        mo = os_release_line.match(line)
        if mo is not None:
            info[mo.group('name')] = os_release_unescape.sub(
                r"\1", mo.group('value')
            )

    return info


def freedesktop_os_release():
    """Return operation system identification from freedesktop.org os-release
    """
    global _os_release_cache

    if _os_release_cache is None:
        errno = None
        for candidate in _os_release_candidates:
            try:
                with open(candidate, encoding="utf-8") as f:
                    _os_release_cache = _parse_os_release(f)
                break
            except OSError as e:
                errno = e.errno
        else:
            raise OSError(
                errno,
                f"Unable to read files {', '.join(_os_release_candidates)}"
            )

    return _os_release_cache.copy()


def generate_sqlalchemy_url(db_config: dict) -> str:
    """
    Generate SQLAlchemy database URL from the given configuration.
    
    Args:
        db_config (dict): A dictionary containing database configuration parameters.
    
    Returns:
        str: SQLAlchemy database URL.
    """
    
    engine = db_config.get("engine")
    user = db_config.get("user")
    password = db_config.get("password", "")  
    host = db_config.get("host", "localhost")
    port = db_config.get("port")
    database_name = db_config.get("name")
    
    # Determine the user info part (user:password) based on whether password is provided
    user_info = f"{user}:{password}@" if password else f"{user}@"
    
    if engine == "PostgreSQL":
        # PostgreSQL URL format: postgresql://user:password@host:port/database_name
        return f"postgresql://{user_info}{host}:{port}/{database_name}"
    
    elif engine == "MySQL":
        # MySQL URL format: mysql+pymysql://user:password@host:port/database_name
        return f"mysql+pymysql://{user_info}{host}:{port}/{database_name}"
    
    elif engine == "MariaDB":
        # MariaDB URL format: mariadb+mariadbconnector://user:password@host:port/database_name
        return f"mariadb+mariadbconnector://{user_info}{host}:{port}/{database_name}"
    
    elif engine == "SQLite":
        # SQLite URL format: sqlite:///database_name (assuming database_name is a file path)
        return f"sqlite:///{database_name}"
        
    elif engine == "Oracle":
        # Oracle URL format: oracle+cx_oracle://user:password@host:port/?service_name=database_name
        return f"oracle+cx_oracle://{user_info}{host}:{port}/?service_name={database_name}"
    
    else:
        raise ValueError(f"Unsupported database engine: {engine}")



def generate_django_orm_config(db_config: dict) -> dict:
    """
    Generate Django ORM configuration dictionary from the given database configuration.
    
    Args:
        db_config (dict): A dictionary containing database configuration parameters.
                           Should include at least "engine" and other necessary parameters.
    
    Returns:
        dict: Django ORM configuration dictionary for the specified engine.
    """
    # Define mappings for each database engine to Django backends
    engine_mapping = {
        "SQLite": "django.db.backends.sqlite3",
        "PostgreSQL": "django.db.backends.postgresql",
        "MySQL": "django.db.backends.mysql",
        "MariaDB": "django.db.backends.mysql",
        "Oracle": "django.db.backends.oracle",
    }
    
    # Default database settings
    engine = db_config.get("engine")
    engine_backend = engine_mapping.get(engine)
    
    # Configure settings based on the specified engine
    config = {
        "ENGINE": engine_backend,
        "NAME": db_config.get("name", "default_db"),
        "USER": db_config.get("user", "default_user"),
        "PASSWORD": db_config.get("password", ""),
        "HOST": db_config.get("host", "localhost"),
        "PORT": db_config.get("port", ""),
    }
    
    # Customize defaults for SQLite
    if engine == "SQLite":
        config["NAME"] = db_config.get("name", "db.sqlite3")  # SQLite only needs a file name, typically in the BASE_DIR

    return config


def get_required_packages(db_name: str) -> list:
    """
    Return a list of required packages for Django based on the database name.
    
    Args:
        db_name (str): The name of the database (e.g., "SQLite", "PostgreSQL", "MySQL", "MariaDB", "Oracle").
    
    Returns:
        list: A list of required package names for the specified database.
    """
    db_packages = {
        "sqlite": [],
        "postgresql": ["psycopg2"],
        "mysql": ["pymysql"],
        "mariadb": ["mariadb"], 
        "oracle": ["cx_Oracle"],  
    }
    
    return db_packages.get(db_name.lower(), [])
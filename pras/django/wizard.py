# django -> wizard.py


def creation_wizard():
    from InquirerPy import inquirer
    import os
    from pras.django.helper.validator import NameValidator, AppNameValidator, PathValidatorPlus
    from pras.django.helper.services import RequirementChecker, style, ProjectCreator
    import shutil
    
    req_checker = RequirementChecker()
    req_checker.run_checks()

    # Ask for project name
    name = inquirer.text(
        message="Project name:",
        qmark="❯",
        amark="✔",
        style=style,
        validate=NameValidator(),
    ).execute()

    # Ask for project location
    project_location = inquirer.filepath(
        message="Project location:",
        qmark="❯",
        amark="✔",
        style=style,
        default='.',
        validate=PathValidatorPlus("Location does not exist", is_dir=True, project_name=name),
        invalid_message="Location does not exist",
        transformer=lambda path: os.path.abspath(path) if path != '.' else os.getcwd(),
        only_files=False,
        only_directories=True
    ).execute()

    project_location = os.getcwd() if project_location == '.' else project_location

    template_folder_name = inquirer.text(
        message="Template folder name:",
        default="templates",
        qmark="❯",
        amark="✔",
        style=style,
        validate=NameValidator(),
    ).execute()

    app_name = inquirer.text(
        message="Application name:",
        default='api',
        qmark="❯",
        amark="✔",
        style=style,
        validate=AppNameValidator(project_name=name),
    ).execute()

    git = False
    if shutil.which("git"):
        git = inquirer.select(
            qmark="❯",
            amark="✔",
            style=style,
            message="Initialize git repository?",
            default="Yes",
            choices=[
                "Yes",
                "No",
            ]
        ).execute()
        git = True if git == "Yes" else False

    # Ask for project category from a list
    orm = inquirer.select(
        message="ORM:",
        qmark="❯",
        amark="✔",
        style=style,
        choices=[
            "Django",
            "SQLAlchemy",
        ],
        default="Django",
    ).execute()

    djangorest = inquirer.select(
        message="Django Rest Framework?",
        qmark="❯",
        amark="✔",
        style=style,
        choices=[
            "Yes",
            "No",
        ],
        default="Yes",
    ).execute()

    djangorest = True if djangorest == "Yes" else False

    djangocors = inquirer.select(
        message="Django CORS Headers?",
        qmark="❯",
        amark="✔",
        style=style,
        choices=[
            "Yes",
            "No",
        ],
        default="Yes",
    ).execute()

    djangocors = True if djangocors == "Yes" else False


    whitenoise = inquirer.select(
        message="Whitenoise?",
        qmark="❯",
        amark="✔",
        style=style,
        choices=[
            "Yes",
            "No",
        ],
        default="No",
    ).execute()

    whitenoise = True if whitenoise == "Yes" else False

    package = {
        "djangorestframework": djangorest,
        "django-cors-headers": djangocors,
        "whitenoise": whitenoise,
    }

    database = inquirer.select(
        message="Database:",
        qmark="❯",
        amark="✔",
        style=style,
        choices=["SQLite", "PostgreSQL", "MySQL", "MariaDB", "MongoDB", "Oracle"],
        default="SQLite",
    ).execute()

    db_config = {}
    if database != "SQLite":
        config_db = inquirer.select(
            message="Configure database?",
            qmark="❯",
            amark="✔",
            style=style,
            choices=[
                "Yes",
                "No, Let me configure it later",
            ],
            default="Yes",
        ).execute()

        if config_db == "Yes":
            db_config["engine"] = database
            db_config["host"] = inquirer.text(
                message="Host:",
                default="localhost",
                qmark="❯",
                validate=lambda x: x != "",
                invalid_message="Host cannot be empty",
                amark="✔",
                style=style,
            ).execute()

            db_config["port"] = inquirer.text(
                message="Port:",
                default="5432",
                qmark="❯",
                amark="✔",
                validate=lambda x: x != "" and x.isnumeric(),
                invalid_message="Port must be a number and cannot be empty",
                style=style,
            ).execute()

            db_config["user"] = inquirer.text(
                message="User:",
                qmark="❯",
                amark="✔",
                validate=lambda x: x != "",
                invalid_message="User cannot be empty",
                style=style,
            ).execute()

            db_config["password"] = inquirer.secret(
                message="Password:",
                qmark="❯",
                amark="✔",
                style=style,
            ).execute()

            db_config["name"] = inquirer.text(
                message="Database name:",
                qmark="❯",
                amark="✔",
                validate=lambda x: x != "",
                invalid_message="Database name cannot be empty",
                style=style,
            ).execute()


    additional_packages = inquirer.text(
        message="Packages:",
        default="",
        qmark="❯",
        amark="✔",
        style=style,
    ).execute()
    packages = additional_packages.split(" ")

    for key, value in package.items():
        if value == True:
            packages.append(key)

    packages = [p for p in packages if p]


    project_creator = ProjectCreator(
        project_name=name,
        project_location=project_location,
        template_folder_name=template_folder_name,
        app_name=app_name,
        git=git,
        orm=orm,
        db_config=db_config,
        packages=packages
    )

    project_creator.create_project()
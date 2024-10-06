#!/bin/bash

# Function to create a Django project and app
create_django_project() {
    PROJECT_NAME="$1"
    APP_NAME="$2"
    PROJECT_DIR="$3"
    CREATE_GIT="$4"
    TEMPLATES_DIR="$5"

    # Create project directory
    mkdir -p "$PROJECT_DIR/$PROJECT_NAME"
    cd "$PROJECT_DIR/$PROJECT_NAME" || exit

    # Create virtual environment
    python3 -m venv venv
    source venv/bin/activate

    # Install Django
    pip install django

    # Create Django project
    django-admin startproject "$PROJECT_NAME" .

    # Create Django app if APP_NAME is provided
    if [[ -n "$APP_NAME" ]]; then
        python manage.py startapp "$APP_NAME"
    fi

    # Run migrations
    python manage.py migrate

   
    # Create templates directory if TEMPLATES_DIR is provided
    if [[ -n "$TEMPLATES_DIR" ]]; then
        mkdir -p "$TEMPLATES_DIR"
    fi

    # Copy the helper script to the project root
    cp /usr/local/share/pras-scripts/helper/helper_script.py "$PROJECT_DIR/$PROJECT_NAME/" 

    if [[ "$CREATE_GIT" == "true" ]]; then
        git init
    fi

    yad --info --text="Django project '$PROJECT_NAME' created successfully!" --title="Success"
}

# Function to display the GUI for project creation
display_gui() {
    # Get the current working directory for the default project directory
    CURRENT_DIR="$(pwd)"
    DEFAULT_TEMPLATES_DIR="$CURRENT_DIR/templates"

    # Initialize the location variable
    PROJECT_DIR="$CURRENT_DIR"

    while true; do
        # Using YAD to create a form for user input
        OUTPUT=$(yad --form \
            --title="Create Django Project" \
            --text="Enter the following details:" \
            --field="Name:" "" \
            --field="Location:":CDIR "$PROJECT_DIR" \
            --field="Template Folder:" "templates" \
            --field="Application Name:" "api" \
            --field="Create Git Repository":CHK \
            --width=800 \
            --height=600 \
            --button="Create":0 \
            --button="Cancel":1)

        # Check if the user canceled the form
        if [[ $? -ne 0 ]]; then
            exit 1
        fi

        # Read user input into variables
        IFS='|' read -r PROJECT_NAME PROJECT_DIR TEMPLATES_DIR APP_NAME CREATE_GIT <<< "$OUTPUT"

        # Check if the user provided the project name
        if [[ -z "$PROJECT_NAME" ]]; then
            yad --error --text="Project Name is required." --title="Input Error"
            continue
        fi

        # Convert checkbox output to boolean
        if [[ "$CREATE_GIT" == "TRUE" ]]; then
            CREATE_GIT="true"
        else
            CREATE_GIT="false"
        fi

        # Call the function to create the Django project
        create_django_project "$PROJECT_NAME" "$APP_NAME" "$PROJECT_DIR" "$CREATE_GIT" "$TEMPLATES_DIR"
        break
    done
}

# Run the GUI for project creation
display_gui

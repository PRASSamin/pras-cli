#!/bin/bash

create_django_project() {
    START_TIME=$(date +%s%3N)
    CREDIT_TEXT="PRAS CLI 1.0"

    echo -e "\e[1;38;5;93m◆ $CREDIT_TEXT\e[0m"
    echo -e " "

    PROJECT_NAME="$1"
    APP_NAME="$2"
    PROJECT_DIR="$3"
    CREATE_GIT="$4"
    TEMPLATES_DIR="$5"

    handle_error() {
        cleanup
        exit 1
    }

    cleanup() {
        rm -rf "$PROJECT_DIR/$PROJECT_NAME"
    }

    # Simulate some progress with YAD
    {
        echo "# Creating project directory"
        mkdir -p "$PROJECT_DIR/$PROJECT_NAME" || handle_error
        cd "$PROJECT_DIR/$PROJECT_NAME" || handle_error
        echo "10"

        echo "# Creating virtual environment"
        python3 -m venv venv || handle_error
        source venv/bin/activate || handle_error
        echo "30"

        echo "# Installing Django"
        pip install django || handle_error
        echo "50"

        echo "# Creating Django project"
        django-admin startproject "$PROJECT_NAME" . || handle_error 
        echo "60"

        if [[ -n "$APP_NAME" ]]; then
            echo "# Creating Django app"
            python manage.py startapp "$APP_NAME" || handle_error 
            echo "70"
        fi

        echo "# Running migrations"
        python manage.py migrate || handle_error
        echo "80"

        if [[ -n "$TEMPLATES_DIR" ]]; then
            echo "# Creating templates directory"
            mkdir -p "$TEMPLATES_DIR" || handle_error
            echo "85"
        fi

        echo "# Copying helper script"
        cp /usr/local/share/pras-scripts/helper/install_django.py "$PROJECT_DIR/$PROJECT_NAME/" || handle_error 
        echo "90"

        echo "# Running helper script"
        if [[ -n "$APP_NAME" ]] && [[ -z "$TEMPLATES_DIR" ]]; then
            python install_django.py --p "$PROJECT_NAME" --a "$APP_NAME" || handle_error 
        elif [[ -n "$TEMPLATES_DIR" ]] && [[ -z "$APP_NAME" ]]; then
            python install_django.py --p "$PROJECT_NAME" --t "$TEMPLATES_DIR" || handle_error 
        elif [[ -n "$APP_NAME" ]] && [[ -n "$TEMPLATES_DIR" ]]; then
            python install_django.py --p "$PROJECT_NAME" --a "$APP_NAME" --t "$TEMPLATES_DIR" || handle_error 
        else
            python install_django.py --p "$PROJECT_NAME" || handle_error 
        fi
        echo "95"

        if [[ "$CREATE_GIT" == "true" ]]; then
            git init || handle_error 
        fi
        echo "100"
    } | yad --width=800 --height=600 --progress \
        --title="Creating Django Project" \
        --auto-close \
        --pulsate \
        --text="Initializing..." \
        --separator="\n" \
        --progress-text="Creating..." \
        --enable-log="Log" \
        --log-expanded \
        --log-height=800 \
        --no-buttons 2>/dev/null 

    END_TIME=$(date +%s%3N)
    ELAPSED_TIME=$((END_TIME - START_TIME))

    if [ -e "$PROJECT_DIR/$PROJECT_NAME" ]; then
        echo -e "\e[1;32m✓\e[0m Django project \e[1m$PROJECT_NAME\e[0m created successfully!"
        echo -e "\e[1;32m✓\e[0m Ready in ${ELAPSED_TIME}ms!"

        yad \
            --info \
            --text="<span font='12'>Django project <b>$PROJECT_NAME</b> created successfully!</span>" \
            --title="Success" \
            --button="Open with Code":0 \
            --button="Close":1 \
            --buttons-layout=center \
            --text-align=center \
            --borders=10 \
            --align=center \
            --no-wrap \
            --center \
            --modal \
            --icon="https://avatars.githubusercontent.com/u/103464543?v=4" 2>/dev/null
    else
        echo -e "\e[1;31m✗\e[0m Project creation failed."
        echo -e "\e[1;31m✗\e[0m Exit in ${ELAPSED_TIME}ms!"
    fi
    }


display_gui() {
    PROJECT_DIR="$(pwd)"

    while true; do
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
            --button="Cancel":1 \
            --button="Create":0 2>/dev/null)

        if [[ $? -ne 0 ]]; then
            exit 1
        fi

        # Read user input into variables
        IFS='|' read -r PROJECT_NAME PROJECT_DIR TEMPLATES_DIR APP_NAME CREATE_GIT <<< "$OUTPUT"

        if [[ -z "$PROJECT_NAME" ]]; then
            yad \
                --error \
                --height=130 \
                --title="Input Error" \
                --text="Project Name is required." \
                --button="Close":1 \
                --buttons-layout=center \
                --text-align=center \
                --borders=10 \
                --align=center \
                --no-wrap \
                --center \
                --modal 2>/dev/null

            continue
        fi

        if [[ "$CREATE_GIT" == "TRUE" ]]; then
            CREATE_GIT="true"
        else
            CREATE_GIT="false"
        fi

        create_django_project "$PROJECT_NAME" "$APP_NAME" "$PROJECT_DIR" "$CREATE_GIT" "$TEMPLATES_DIR"
        break
    done
}

display_gui

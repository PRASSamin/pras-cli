#!/bin/bash

if [ -z "$1" ]; then
    echo "<keyword> Required"
    exit 1
else
    keyword="$1"
fi

send_notification() {
    zenity --question --text="$keyword MacBook is connected to the network. Click 'YES' to stop the script." --title="Device Found"
}

CREDIT_TEXT="PRAS CLI 1.0"

echo -e "\e[1;38;5;93m◆ $CREDIT_TEXT\e[0m"
echo -e " "

while true; do

    echo "Searching for $keyword..."
    output=$(avahi-browse -a -t | grep "$keyword")

    if [[ ! -z "$output" ]]; then
        send_notification

        if [ $? -eq 0 ]; then
            exit 0
        fi

        sleep 30
    else
        echo "Device not found. Retrying in 2 seconds..."
    fi

    sleep 2
done

exit 0

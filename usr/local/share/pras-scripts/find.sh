#!/bin/bash

if [ -z "$1" ]; then
    keyword="Biddut"
else
    keyword="$1"
fi

send_notification() {
    zenity --question --text="$keyword MacBook is connected to the network. Click 'YES' to stop the script." --title="Device Found"
}

while true; do
    echo "Searching for $keyword..."
    output=$(avahi-browse -a -t | grep "$keyword")

    if [[ ! -z "$output" ]]; then
        send_notification

        if [ $? -eq 0 ]; then
            echo "Notification button clicked. Exiting..."
            exit 0
        fi

        sleep 30
    else
        echo "Device not found. Retrying in 2 seconds..."
    fi

    sleep 2
done

exit 0

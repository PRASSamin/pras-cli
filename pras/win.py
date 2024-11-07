import subprocess

def open(command):
    try:
        # Open the Command Prompt and run the command
        subprocess.run(['start', 'cmd', '/K', command], shell=True)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    # Command you want to run in the terminal
    command = "pras shell"
    open(command)

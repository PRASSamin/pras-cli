# root -> helper -> notifications.py
from notifypy import Notify

class Notification(Notify):
    def __init__(self, title, message):
        import pras
        super().__init__()
        self.application_name = pras.CLI_NAME.replace(" ", "")
        self.title = title
        self.message = message
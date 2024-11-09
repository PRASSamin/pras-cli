import sys
import os
from notifypy import Notify
from contextlib import redirect_stderr

class Notification(Notify):
    def __init__(self, title, message):
        import pras
        super().__init__()
        self.application_name = pras.CLI_NAME.replace(" ", "")
        self.title = title
        self.message = message

    def send(self, block=True):
        with open(os.devnull, 'w') as devnull:
            with redirect_stderr(devnull):
                try:
                    super().send(block=block)
                except Exception as e:
                    pass

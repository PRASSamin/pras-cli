[Setup]
AppName=PRAS CLI
AppVersion=0.1.0
DefaultDirName={commonpf}\PRAS CLI
DefaultGroupName=PRAS CLI
OutputDir=.\builds\windows
OutputBaseFilename=prascli-v2024.11.2
Compression=lzma
SolidCompression=yes
SetupIconFile=.\dist\prascli-v2024.11.2\icons\prascli.ico
UninstallFilesDir={app}\unins
AppPublisher=PRAS
AppCopyright=PRAS © 2024
AppComments=PRAS CLI version 2024.11.2
AppPublisherURL=https://pras.me

[Files]
Source: ".\dist\prascli-v2024.11.2\*"; DestDir: "{app}"; Flags: recursesubdirs createallsubdirs

[Registry]
Root: HKCU; Subkey: "Environment"; ValueType: string; ValueName: "Path"; ValueData: "{app}"; Flags: uninsdeletevalue

[Icons]
Name: "{group}\PRAS CLI"; Filename: "{app}\win.exe"
Name: "{group}\Uninstall PRAS CLI"; Filename: "{uninstallexe}"

[Run]
Filename: "{app}\win.exe"; Description: "Launch PRAS CLI"; Flags: runminimized

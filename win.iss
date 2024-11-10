#define AppVersion "2024.11.2"
[Setup]
AppName=PRAS CLI
AppVersion={#AppVersion}
DefaultDirName={commonpf}\PRAS CLI
DefaultGroupName=PRAS CLI
OutputDir=.\builds\windows
OutputBaseFilename=prascli-{#AppVersion}
Compression=lzma
SolidCompression=yes
SetupIconFile=.\dist\prascli-v{#AppVersion}\icons\prascli.ico
UninstallFilesDir={app}\unins
AppPublisher=PRAS
AppCopyright=PRAS © 2024
AppComments=PRAS CLI is a powerful, cross-platform command-line tool designed to simplify and speed up workflows for developers and tech-savvy users alike. With a suite of essential features and tools, PRAS CLI enhances productivity by streamlining everyday tasks, all in a single, easy-to-use package. Built for versatility and efficiency, PRAS CLI is your go-to solution for a seamless command-line experience.
AppPublisherURL=https://cli.pras.me

[Files]
Source: ".\dist\prascli-v{#AppVersion}\*"; DestDir: "{app}"; Flags: recursesubdirs createallsubdirs

[Registry]
Root: HKCU; Subkey: "Environment"; ValueType: expandsz; ValueName: "Path"; ValueData: "{app};%Path%"; Flags: uninsdeletevalue

[Icons]
Name: "{group}\PRAS CLI"; Filename: "{app}\win.exe"
Name: "{group}\Uninstall PRAS CLI"; Filename: "{uninstallexe}"

[Run]
Filename: "{app}\win.exe"; Description: "Launch PRAS CLI"; Flags: runminimized

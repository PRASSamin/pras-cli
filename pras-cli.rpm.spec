Name:           pras-cli
Version:        2024.11.2
Release:        1%{?dist}
Summary:        A CLI TOOL

License:        MIT
URL:            https://github.com/PRASSamin/pras-cli
BuildArch:      x86_64

%description
PRAS CLI is a command-line tool.

%install
# Create directory and rename the binary to 'pras' during installation
mkdir -p %{buildroot}/usr/local/bin
cp -p /media/prassamin/Workspace/Git/pras-cli/dist/pras-cli %{buildroot}/usr/local/bin/pras

%files
/usr/local/bin/pras

%changelog
* Thu Nov 8 2024 PRAS Samin <prassamin@gmail.com> - 2024.11.1-1
- Initial RPM package

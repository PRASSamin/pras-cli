Name:           pras-cli
Version:        2024.11.2
Release:        1%{?dist}
Summary:        Cross-platform command-line tool for productivity and workflow efficiency

License:        MIT
URL:            https://cli.pras.me
BuildArch:      x86_64


%description
PRAS CLI is a powerful, cross-platform command-line tool designed to simplify and speed up workflows for developers and tech-savvy users alike. With a suite of essential features and tools, PRAS CLI enhances productivity by streamlining everyday tasks, all in a single, easy-to-use package. Built for versatility and efficiency, PRAS CLI is your go-to solution for a seamless command-line experience.


%install
# Create directory and rename the binary to 'pras' during installation
mkdir -p %{buildroot}/usr/local/bin
cp -p /media/prassamin/Workspace/Git/pras-cli/dist/pras-cli %{buildroot}/usr/local/bin/pras

%files
/usr/local/bin/pras

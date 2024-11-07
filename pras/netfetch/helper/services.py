# netfetch -> helper -> services.py
class Listener:
    """Listener class for Zeroconf events."""
    def __init__(self, found_devices, keyword):
        self.found_devices = found_devices
        self.keyword = keyword

    def add_service(self, zeroconf, service_type, name):
        """Add the service."""
        if not self.keyword or self.keyword.lower() in name.lower():
            try:
                info = zeroconf.get_service_info(service_type, name)
                if info:
                    device_info = self.parse_device_info(info, service_type)
                    self.found_devices.append(device_info)
            except Exception as e:
                """ignore unnecessary exceptions"""
                pass

    def update_service(self, zeroconf, service_type, name):
        """Update the service."""
        pass

    def parse_device_info(self, info, service_type):
        """Parse the device information."""
        device_name = info.name.split('.')[0]
        mac_address = self.extract_mac_address(info.name)
        ip_addresses = info.parsed_addresses()
        ip_version = "IPv6" if any(':' in addr for addr in ip_addresses) else "IPv4"
        service_details = self.get_service_description(service_type)

        return {
            'device_name': device_name,
            'service_type': service_type,
            'mac_address': mac_address,
            'device_type': self.determine_device_type(service_type),
            'ip_version': ip_version,
            'service_details': service_details,
            'ip_address': ', '.join(ip_addresses) if ip_addresses else "N/A",
            'port': info.port,
            'protocol': "TCP" if "_tcp" in service_type else "UDP"
        }

    def extract_mac_address(self, name):
        """Extract the MAC address from the name."""
        import re

        mac_pattern = r'([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})'
        match = re.search(mac_pattern, name)
        return match.group(0) if match else "N/A"

    def determine_device_type(self, service_type):
        """Determine the device type based on the service type."""
        device_types = {
            "_smb": "Computer",
            "_airplay": "Media Device",
            "_printer": "Printer",
            "_http": "Web Service"
        }
        return next((v for k, v in device_types.items() if k in service_type), "Other")

    def get_service_description(self, service_type):
        """Get the service description based on the service type."""
    
        service_descriptions = {
            "_airplay._tcp.local.": "AirPlay Remote Video",
            "_raop._tcp.local.": "AirTunes Remote Audio",
            "_smb._tcp.local.": "File Sharing",
            "_http._tcp.local.": "HTTP Web Service",
            "_printer._tcp.local.": "Printer Service",
            "_https._tcp.local.": "HTTPS Web Service",
            "_ssh._tcp.local.": "SSH Web Service",
            "_telnet._tcp.local.": "Telnet Web Service",
            "_daap._tcp.local.": "DAAP Web Service",
            "_dlna._tcp.local.": "D-LNA Web Service",
            "_openvpn._tcp.local.": "OpenVPN Web Service",
            "_hap._tcp.local.": "HAP Web Service",
            "_x10._tcp.local.": "X10 Web Service",
            "_services._dns-sd._udp.local.": "DNS Service",
            "_device-info._tcp.local.": "Device Information Service",
            "_upnp._tcp.local.": "UPnP Web Service",
            "_mi-connect._udp.local.": "MiConnect Web Service",
            "_wled._tcp.local.": "WLED Web Service",
            "_wled._udp.local.": "WLED Web Service"
        }
        return service_descriptions.get(service_type, "Other")

    def notify_and_display_results(self):
        from pras.helper.notifications import Notification
        from prettytable import ALL
        from prettytable.colortable import ColorTable, Theme
        from colorama import Fore, Style
        import click

        """Notify the user and display the results."""
        total_device = len([
            ip
            for device in self.found_devices
            for ip in device['ip_address'].split(', ')
        ])

        notif = Notification("Device Found", (f"Found {total_device} devices containing '{self.keyword}'" if self.keyword else f"Found {total_device} devices") if self.found_devices else "No devices found")
        notif.send(block=False)

        if self.found_devices:
            table = ColorTable(theme=Theme(
                default_color="38;5;223",
                vertical_char=f"{Style.BRIGHT}|{Style.RESET_ALL}",
                vertical_color="38;5;223",
                horizontal_char=f"{Style.BRIGHT}-{Style.RESET_ALL}",
                horizontal_color="38;5;223",
                junction_char=f"{Style.BRIGHT}+{Style.RESET_ALL}",
                junction_color="38;5;223",
            ))
            table.field_names = [
                f"{Fore.CYAN}Device Name{Style.RESET_ALL}",
                f"{Fore.CYAN}Service Type{Style.RESET_ALL}",
                f"{Fore.CYAN}MAC{Style.RESET_ALL}",
                f"{Fore.CYAN}Device Type{Style.RESET_ALL}",
                f"{Fore.CYAN}IP Version{Style.RESET_ALL}",
                f"{Fore.CYAN}Service Details{Style.RESET_ALL}",
                f"{Fore.CYAN}IP{Style.RESET_ALL}",
                f"{Fore.GREEN}Port{Style.RESET_ALL}",
                f"{Fore.YELLOW}Protocol{Style.RESET_ALL}"
            ]
            table.align = "l"
            table.border = True
            table.hrules = ALL

            for device in self.found_devices:
                ip_addresses = device['ip_address'].split(', ')
                for ip in ip_addresses:
                    table.add_row([
                        f"{Fore.GREEN}{device['device_name']}{Style.RESET_ALL}",
                        f"{Fore.YELLOW}{device['service_type']}{Style.RESET_ALL}",
                        f"{Fore.MAGENTA}{device['mac_address']}{Style.RESET_ALL}",
                        f"{Fore.BLUE}{device['device_type']}{Style.RESET_ALL}",
                        f"{Fore.CYAN}{'IPv6' if ip.__contains__(':') else 'IPv4'}{Style.RESET_ALL}",
                        f"{Fore.MAGENTA}{device['service_details']}{Style.RESET_ALL}",
                        f"{Fore.CYAN}{ip}{Style.RESET_ALL}",
                        f"{Fore.GREEN}{device['port']}{Style.RESET_ALL}",
                        f"{Fore.YELLOW}{device['protocol']}{Style.RESET_ALL}"
                    ])

            click.echo("\nDevices Found:")
            click.echo(table)

        else:
            click.echo("No devices found.")
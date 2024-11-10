# pras -> module -> netfetch.py
def netfetcher(keyword_arg, loop):
    import time
    from zeroconf import Zeroconf, ServiceBrowser
    import os
    from pras.netfetch.helper.services import Listener
    import subprocess

    """Entry point for the netfetch module."""
    search_duration = 60
    start_time = time.time()
    found_devices = []

    zeroconf = Zeroconf()
    listener = Listener(found_devices, keyword_arg)

    service_types = [
        "_airplay._tcp.local.", "_raop._tcp.local.", "_smb._tcp.local.",
        "_afpovertcp._tcp.local.", "_ipp._tcp.local.", "_printer._tcp.local.",
        "_http._tcp.local.", "_https._tcp.local.", "_ssh._tcp.local.",
        "_telnet._tcp.local.", "_daap._tcp.local.", "_dlna._tcp.local.",
        "_openvpn._tcp.local.", "_hap._tcp.local.", "_x10._tcp.local.",
        "_services._dns-sd._udp.local.", "_device-info._tcp.local.", "_upnp._tcp.local.", "_mi-connect._udp.local.", "_wled._tcp.local.", "_wled._udp.local."
    ]

    for service in service_types:
        ServiceBrowser(zeroconf, service, listener)

    try:
        while True:
            time.sleep(2)
            if listener.found_devices:
                break
            if not loop and time.time() - start_time > search_duration:
                break
    finally:
        zeroconf.close()
        listener.notify_and_display_results()
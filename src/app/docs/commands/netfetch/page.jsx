"use client";
import MainContainer from '@/app/components/MainContainer'
import React from 'react'
import DocContainer from '../../components/docContainer'
import Image from 'next/image';
import Highlighter from '@/app/components/Highlighter';

const CommandDjangoPageView = () => {
    return (
        <MainContainer FooterClassName={'!mt-0'}>
            <DocContainer>
                <h1 id='netfetch' data-id-name='NetFetch' className="font-extrabold text-2xl">NetFetch</h1>
                <p className="text-[15px] text-muted-foreground mt-2">
                    The <strong>NetFetch</strong> command is a cross-platform network scanning utility designed to locate devices and services within a network. It identifies and lists all available devices and their services, similar to the <strong>avahi-browse -a -t</strong> command in Linux, but with enhanced compatibility for Windows, and other operating systems.
                </p>
                <Image src={'/command/netfetch.svg'} width={500} height={500} className='w-full h-auto mt-8 border-[1px] border-zinc-700 rounded-lg 2xl:w-[80%]' alt="command shell" />


                <div id="usage" data-id-name="Usage">
                    <h2 className="text-xl font-extrabold mt-10 border-b pb-3 mb-5">Usage</h2>
                    <p className="leading-7 mt-5 mb-1.5">
                        To scan the network for devices and services, use the following command:
                    </p>
                    <Highlighter language={'bash'}>
                        {`pras netfetch`}
                    </Highlighter>

                    <p className="leading-7 mt-10">
                        To access the NetFetch command in the interactive shell, use:
                    </p>
                    <Highlighter language={'bash'}>
                        {`netfetch`}
                    </Highlighter>
                </div>

                <div id='flags-and-options' data-id-name='Flag and Options'>
                    <h2 className="text-xl font-extrabold mt-10 border-b pb-3 mb-5">Flags and Options</h2>
                    <p className="leading-7 mt-5 mb-1.5 ">
                        The NetFetch command includes the following flags and options:
                    </p>
                    <h3 className='text-lg font-extrabold mt-7 mb-2'><strong>-s | --search</strong></h3>
                    <p className="leading-7 mt-3 text-muted-foreground mb-1.5">
                        Searches for devices and services in the network matching the specified keyword.
                    </p>
                    <Highlighter language={'bash'}>
                        {`pras netfetch -s [keyword]
# or
netfetch -s [keyword]   # if using the interactive shell`}
                    </Highlighter>
                    <h3 className='text-lg font-extrabold mt-7 mb-2'><strong>-l | --loop</strong></h3>
                    <p className="leading-7 mt-5 mb-1.5">
                        Works with the <strong>-s</strong> flag to continuously scan the network for a device matching the keyword. <strong>NetFetch</strong> will only stop when the specified device connects to the network.
                    </p>
                    <Highlighter language={'bash'}>
                        {`pras netfetch -s [keyword] -l
# or
netfetch -s [keyword] -l   # if using the interactive shell`}
                    </Highlighter>
                </div>

                <div id='note' data-id-name='Note'>
                    <h2 className="text-xl font-extrabold mt-10 border-b pb-3 mb-5">Additional Notes</h2>
                    <ul className='list-disc pl-5'>
                        <li className='mt-2 leading-7'><strong>Timeout:</strong> When using only the <strong>-s</strong> flag (without <strong>-l</strong>), <strong>NetFetch</strong> searches for up to 1 minute. If no matching device is found within that time, the command terminates automatically.</li>
                        <li className='mt-2 leading-7'><strong>Device Compatibility:</strong> <strong>NetFetch</strong> is designed to support a wide range of devices and services commonly available in networked environments, including file-sharing servers, printers, and various IoT devices.</li>
                    </ul>
                </div>
            </DocContainer>
        </MainContainer>

    )
}

export default CommandDjangoPageView

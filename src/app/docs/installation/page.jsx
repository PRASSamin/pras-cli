"use client";
import MainContainer from "../../components/MainContainer";
import DocContainer from "../components/docContainer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Highlighter from "@/app/components/Highlighter";
import Link from "next/link";

const InstallationPageView = () => {

    return (
        <MainContainer FooterClassName={'!mt-0'}>
            <DocContainer>
                <h1 id="installation" data-id-name="Installation" className="font-extrabold text-2xl">Installation</h1>
                <p className="text-[15px] text-muted-foreground mt-2">
                    Get started with the installation process.
                </p>

                <h2 id="supported-os-and-distributions" data-id-name="Supported OS and Distributions" className="text-xl font-extrabold mt-10 border-b pb-3 mb-5">Supported OS and Distributions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 font-bold gap-4">
                    <Button className="py-10 rounded-xl w-full h-full flex flex-col items-center justify-center gap-2" variant="outline">
                        <Image src={'/windows.svg'} width={100} height={100} alt="windows logo" />
                        Windows
                    </Button>
                    <Button className="py-10 rounded-xl w-full h-full flex flex-col items-center justify-center gap-2" variant="outline">
                        <Image src={'/debian.svg'} width={100} height={100} alt="debian logo" />
                        Debian
                    </Button>
                    <Button className="py-10 rounded-xl w-full h-full flex flex-col items-center justify-center gap-2" variant="outline">
                        <Image src={'/redhat.svg'} width={100} height={100} alt="redhat logo" />
                        Red Hat
                    </Button>
                </div>

                <h2 id="windows" data-id-name="Windows" className="text-xl font-extrabold mt-10 border-b pb-3 mb-5">Windows</h2>
                <p className="text-[15px] text-muted-foreground mt-2 mb-2 leading-7">
                    Download the latest version of the PRAS CLI Tool for <Link href="/download/version/latest" className="font-bold underline hover:text-white">Windows</Link>. You will receive a <strong>.exe</strong> file. Run the file and follow the installation process to complete the setup and access the CLI. After installation, restarting your system is recommended (though not mandatory). If you choose not to restart, make sure to close and reopen any open terminal windows. You can then access the CLI by typing <strong>pras</strong> in the terminal.
                </p>

                <p className="text-[15px] mt-5 mb-2 leading-7">Run the following command to get information about the CLI</p>
                <Highlighter language="bash">
                    pras --help
                </Highlighter>

                <div id="linux" data-id-name="Linux">
                    <h2 className="text-xl font-extrabold mt-10 border-b pb-3 mb-5">Linux</h2>
                    <p className="text-[15px] text-muted-foreground mt-2 mb-2 leading-7">
                        Download the latest version of the PRAS CLI Tool for <Link href="/download/version/latest" className="font-bold underline hover:text-white">Linux</Link>. Then run the following commands in the terminal to install the CLI.
                    </p>
                    <h3 id="debian" data-id-name="Debian" className="text-lg mt-5">Debian-based distributions</h3>
                    <Highlighter language="bash">
                        {`sudo dpkg -i pras-cli-*.deb
    # or
    sudo apt install pras-cli-*.deb`}
                    </Highlighter>
                    <h3 id="redhat" data-id-name="Red Hat" className="text-lg mt-5">Red Hat-based distributions</h3>
                    <Highlighter language="bash">
                        {`sudo rpm -i pras-cli-*.rpm
    # or
    sudo dnf install pras-cli-*.rpm
    # or
    sudo yum install pras-cli-*.rpm`}
                    </Highlighter>

                    <p className="text-[15px] mt-5 mb-2 leading-7">Run the following command to get information about the CLI</p>
                    <Highlighter language="bash">
                        pras --help
                    </Highlighter>
                </div>
            </DocContainer>
        </MainContainer>
    )
}

export default InstallationPageView
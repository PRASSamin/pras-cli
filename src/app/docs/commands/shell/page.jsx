"use client";
import MainContainer from '@/app/components/MainContainer'
import React from 'react'
import DocContainer from '../../components/docContainer'
import Image from 'next/image';
import Highlighter from '@/app/components/Highlighter';
import { osCommands as osc } from './osCommands';
import { prasCommands as prasc } from './prasCommands';

const CommandShellPageView = () => {
    const osCommands = osc();
    const prasCommands = prasc();

    return (
        <MainContainer FooterClassName={'!mt-0'}>
            <DocContainer>
                    <h1 id='shell' data-id-name='Shell' className="font-extrabold text-2xl">Shell</h1>
                    <p className="text-[15px] text-muted-foreground mt-2">
                        A interactive shell that lets you run <strong>pras</strong> commands directly by name. and also allow you to run most of common shell commands.
                    </p>
                    <Image src={'/command/shell.svg'} width={500} height={500} className='w-full h-auto mt-8 border-[1px] border-zinc-700 rounded-lg 2xl:w-[80%] ' alt="command shell" />

                    <p className='leading-7 mt-10 mb-1.5'>
                        To start the shell, run the following command
                    </p>
                    <Highlighter language={'bash'}>
                        {`pras shell`}
                    </Highlighter>

                    <div id='available-commands' data-id-name='Available Commands'>
                        <h2 className="text-xl font-extrabold mt-10 border-b pb-3 mb-5">Available Commands</h2>
                        <h3 id='pras-commands' data-id-name="PRAS Commands" className="text-lg mt-5 mb-2">PRAS Commands</h3>
                        <ul className="list-disc pl-5">
                            {prasCommands.map((command, index) => <li
                                className='leading-7 text-md' key={index}>
                                <a href={`/docs/commands/${command.name}`}><strong className='cursor-pointer hover:underline'>{command.name}</strong></a> - {command.description}</li>
                            )}
                        </ul>
                        <h3 id='os-commands' data-id-name="OS Commands" className="text-lg mt-5 mb-2">OS Commands</h3>
                        <ul className="list-disc pl-5">
                            {osCommands.map((command, index) => <li
                                className='leading-7 text-md' key={index}>
                                <a href={`#${command.name}`}
                                ><strong className='cursor-pointer hover:underline'>{command.name}</strong></a> - {command.description}</li>
                            )}
                        </ul>
                    </div>
                    
                    <div id='os-commands-reference' data-id-name="OS Commands Reference">
                        <h2 className="text-xl font-extrabold mt-10 border-b pb-3 mb-5">OS Commands Reference</h2>
    
                        <h3 id='cd' data-id-name="cd" className="text-lg mt-5 mb-2">cd</h3>
    
                        <p className="leading-7 text-muted-foreground text-[15px]">
                            Use the <strong>cd</strong> command to change the current working directory to a specified path. Provide the path to the directory you want to switch to, as shown in the example below.
                        </p>
    
                        <Highlighter language="bash">
                            {`cd [path]`}
                        </Highlighter>
    
                        <p className="leading-7 text-muted-foreground text-[15px] mt-5">
                            To display the current directory after changing directories, use the <strong>-s</strong> flag with the <strong>cd</strong> command, as demonstrated below.
                        </p>
    
                        <Highlighter language="bash">
                            {`cd -s`}
                        </Highlighter>
                        <h3 id='clear' data-id-name="clear" className="text-lg mt-8 mb-2">clear</h3>
    
                        <p className="leading-7 text-muted-foreground text-[15px]">
                            Use the <strong>clear</strong> command to clear the terminal screen.
                        </p>
    
                        <h3 id='help' data-id-name="help" className="text-lg mt-8 mb-2">help</h3>
    
                        <p className="leading-7 text-muted-foreground text-[15px]">
                            Use the <strong>help</strong> command to display information about shell commands.
                        </p>
    
                        <h3 id='ls' data-id-name="ls" className="text-lg mt-8 mb-2">ls</h3>
    
                        <p className="leading-7 text-muted-foreground text-[15px]">
                            Use the <strong>ls</strong> command to list files and directories in the current directory.
                        </p>
                        <Highlighter language="bash">
                            {`ls`}
                        </Highlighter>
    
                        <p className="leading-7 text-muted-foreground text-[15px] mt-5">
                            To list files and directories in a specific directory, provide the path to that directory, as shown below.
                        </p>
    
                        <h4 className="text-md my-2">Supported Path Options:</h4>
                        <ul className="list-disc pl-5 mb-2">
                            <li className="leading-7 text-md"><strong>..</strong> - Move up one level from the current directory</li>
                            <li className="leading-7 text-md"><strong>.</strong> - Current directory</li>
                            <li className="leading-7 text-md"><strong>/</strong> - Root directory</li>
                            <li className="leading-7 text-md"><strong>Absolute path</strong> - Full path from the root directory</li>
                        </ul>
                        <Highlighter language="bash">
                            {`ls [path]`}
                        </Highlighter>
    
                        <h3 id='cp' data-id-name="cp" className="text-lg mt-8 mb-2">cp</h3>
    
                        <p className="leading-7 text-muted-foreground text-[15px]">
                            Use the <strong>cp</strong> command to copy files or directories from one location to another. Specify the <strong>[source]</strong> path for the file or directory you want to copy and the <strong>[destination]</strong> path where you want it placed. See the example below for usage.
                        </p>
                        <Highlighter language="bash">
                            {`cp [source] [destination]`}
                        </Highlighter>
    
                        <h3 id='echo' data-id-name="echo" className="text-lg mt-8 mb-2">echo</h3>
    
                        <p className="leading-7 text-muted-foreground text-[15px]">
                            Use the <strong>echo</strong> command to display text or variables on the terminal. Provide the text or variable you wish to display, as shown in the example below.
                        </p>
                        <Highlighter language="bash">
                            {`echo [text]`}
                        </Highlighter>
                        <h3 id='exit' data-id-name="exit" className="text-lg mt-8 mb-2">exit</h3>
    
                        <p className="leading-7 text-muted-foreground text-[15px]">
                            Use the <strong>exit</strong> command to terminate the current shell session. This will close the interactive session of <strong>pras shell</strong> and return you to the main command prompt.
                        </p>
    
                        <h3 id='mkdir' data-id-name="mkdir" className="text-lg mt-8 mb-2">mkdir</h3>
    
                        <p className="leading-7 text-muted-foreground text-[15px]">
                            Use the <strong>mkdir</strong> command to create a new directory. Specify the name or path of the directory you want to create, as shown in the example below.
                        </p>
                        <Highlighter language="bash">
                            {`mkdir [name]`}
                        </Highlighter>
    
                        <h3 id='mv' data-id-name="mv" className="text-lg mt-8 mb-2">mv</h3>
    
                        <p className="leading-7 text-muted-foreground text-[15px]">
                            Use the <strong>mv</strong> command to move or rename files and directories. Provide the <strong>[source]</strong> path of the file or directory to move or rename, and the <strong>[destination]</strong> path where you want it to be located, as shown below.
                        </p>
                        <Highlighter language="bash">
                            {`mv [source] [destination]`}
                        </Highlighter>
    
                        <h3 id='rm' data-id-name="rm" className="text-lg mt-8 mb-2">rm</h3>
    
                        <p className="leading-7 text-muted-foreground text-[15px]">
                            Use the <strong>rm</strong> command to delete files or directories. Provide the <strong>[path]</strong> of the file or directory you wish to remove, as shown in the example below.
                        </p>
                        <Highlighter language="bash">
                            {`rm [path]`}
                        </Highlighter>
    
                        <p className="leading-7 text-muted-foreground text-[15px] mt-5">
                            To delete a directory and its contents (when the directory is not empty), use the <strong>-r</strong> (recursive) flag with the <strong>rm</strong> command, as demonstrated below.
                        </p>
                        <Highlighter language="bash">
                            {`rm -r [directory_path]`}
                        </Highlighter>
    
                        <h3 id='touch' data-id-name="touch" className="text-lg mt-8 mb-2">touch</h3>
    
                        <p className="leading-7 text-muted-foreground text-[15px]">
                            Use the <strong>touch</strong> command to create a new empty file. Provide the name or path of the file you want to create, as shown in the example below.
                        </p>
                        <Highlighter language="bash">
                            {`touch [filename]`}
                        </Highlighter>
    
                        <h3 id='cat' data-id-name="cat" className="text-lg mt-8 mb-2">cat</h3>
    
                        <p className="leading-7 text-muted-foreground text-[15px]">
                            Use the <strong>cat</strong> command to display the contents of a file. Provide the name or path of the file you want to display, as shown in the example below.
                        </p>
                        <Highlighter language="bash">
                            {`cat [path]`}
                        </Highlighter>
                    </div>


            </DocContainer>
        </MainContainer >
    )
}

export default CommandShellPageView

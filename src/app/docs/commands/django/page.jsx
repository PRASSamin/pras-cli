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
                <h1 id='django' data-id-name='Django' className="font-extrabold text-2xl">Django</h1>
                <p className="text-[15px] text-muted-foreground mt-2">
                    The <strong>Django</strong> command allows you to quickly set up a new Django project with essential configurations. It creates a new project directory with the name you specify, initializes a virtual environment, and sets up fundamental components, saving significant time in project setup.
                </p>
                <Image src={'/command/django.svg'} width={500} height={500} className='w-full h-auto mt-8 border-[1px] border-zinc-700 rounded-lg 2xl:w-[80%]' alt="command shell" />

                <div id="usage" data-id-name="Usage">
                    <h2 className="text-xl font-extrabold mt-10 border-b pb-3 mb-5">Usage</h2>
                    <p className="leading-7 mt-5 mb-1.5">
                        To create a new Django project, use the following command:
                    </p>
                    <Highlighter language={'bash'}>
                        {`pras django`}
                    </Highlighter>

                    <p className="leading-7 mt-10">
                        To access the Django command in the interactive shell, use:
                    </p>
                    <Highlighter language={'bash'}>
                        {`django`}
                    </Highlighter>
                </div>

                <div id='support-setup' data-id-name='Support Setup'>
                    <h2 className="text-xl font-extrabold mt-10 border-b pb-3 mb-5">Support Setup</h2>
                    <p className="leading-7 mt-5 mb-1.5 ">
                        The Django command includes setup for the following features:
                    </p>
                    <ul className="list-disc pl-5">
                        <li className="leading-7 text-[15px]">
                            Template folder structure with automatic registration
                        </li>
                        <li className="leading-7 text-[15px]">Creation and configuration of a default app</li>
                        <li className="leading-7 text-[15px]">Git repository initialization</li>
                        <li className="leading-7 text-[15px]">Virtual environment setup</li>
                        <li className="leading-7 text-[15px]">
                            <a href='#orm'><strong>ORM</strong></a> configuration for various Object-Relational Mappers
                        </li>
                        <li className="leading-7 text-[15px]">Django REST framework installation and setup</li>
                        <li className="leading-7 text-[15px]">CORS headers setup for cross-origin support</li>
                        <li className="leading-7 text-[15px]">WhiteNoise setup for serving static files</li>
                        <li className="leading-7 text-[15px]">
                            <strong><a href='#database'>Database</a></strong> configuration for multiple database systems
                        </li>
                        <li className="leading-7 text-[15px]">Installation of additional required packages</li>
                    </ul>
                </div>
                <div data-id-name="ORM Support" id="orm">
                    <h2 className="text-xl font-extrabold mt-10 border-b pb-3 mb-5">ORM Support</h2>
                    <p className="leading-7 mt-5 mb-1.5">
                        The <strong>django</strong> command supports the following Object-Relational Mappers (<strong>ORMs</strong>):
                    </p>
                    <ul className="list-disc pl-5">
                        <li className="leading-7 text-[15px]">Django ORM</li>
                        <li className="leading-7 text-[15px]">SQLAlchemy</li>
                    </ul>
                </div>

                <div data-id-name="Database Support" id="database">
                    <h2 className="text-xl font-extrabold mt-10 border-b pb-3 mb-5">Database Support</h2>
                    <p className="leading-7 mt-5 mb-1.5">
                        The <strong>django</strong> command supports the following databases:
                    </p>
                    <ul className="list-disc pl-5">
                        <li className="leading-7 text-[15px]">SQLite</li>
                        <li className="leading-7 text-[15px]">PostgreSQL</li>
                        <li className="leading-7 text-[15px]">MySQL</li>
                        <li className="leading-7 text-[15px]">MariaDB</li>
                        <li className="leading-7 text-[15px]">MongoDB</li>
                        <li className="leading-7 text-[15px]">Oracle</li>
                    </ul>
                </div>

                <div data-id-name="PRAS provided package" id="sqlalchemy-django-helper" className="mt-10 p-8 bg-zinc-900 rounded-lg shadow-md border border-zinc-700">
                    <h1 className="text-xl font-extrabold border-b pb-3 mb-5">PRAS SQLAlchemy-Django Helper Package
                        <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full font-medium ml-2">Promotion</span>
                    </h1>

                    <p className="leading-7 text-[15px] mb-5">
                        Discover the <strong className='bg-zinc-700'>PrasBridge</strong>, a robust tool crafted for projects utilizing <strong className='bg-zinc-700'>SQLAlchemy</strong> as their primary ORM with <strong className='bg-zinc-700'>Django</strong>. This package delivers features often exclusive to Django's ORM, allowing SQLAlchemy users to enjoy Django-style functionalities without needing to rely on Django’s ORM directly.
                    </p>

                    <p className="leading-7 text-[15px] mb-5">
                        Key features include simplified serialization, session management, templatetag for form handling, and more, all optimized to work seamlessly with SQLAlchemy while mimicking the convenience of Django’s ORM.
                    </p>

                    <p className="leading-7 text-[15px] mb-5">
                        To explore full documentation and installation instructions, follow the links below:
                    </p>

                    <ul className="list-disc pl-5">
                        <li className="leading-7">
                            <strong>GitHub</strong>: Access detailed documentation and source code on
                            <a href="https://github.com/PRASSamin/PrasBridge" target="_blank" className="text-blue-500 hover:underline"> GitHub</a>.
                        </li>
                        <li className="leading-7">
                            <strong>PyPI</strong>: Install the package and find additional details on
                            <a href="https://pypi.org/project/PrasBridge/" target="_blank" className="text-blue-500 hover:underline"> PyPI</a>.
                        </li>
                    </ul>
                </div>

            </DocContainer>
        </MainContainer>

    )
}

export default CommandDjangoPageView

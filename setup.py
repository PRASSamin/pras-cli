from setuptools import setup, find_packages
from pras import __version__ as VERSION
from pras import CLI_AUTHOR as AUTHOR
from pras import CLI_AUTHOR_EMAIL as AUTHOR_EMAIL
from pras import CLI_DESCRIPTION as DESCRIPTION
from pras import CLI_NAME as NAME
from pras import CLI_GITHUB_LINK as GITHUB_LINK
from pras import CLI_URL as WEBSITE
setup(
    name=f"{NAME.replace(" ", "-").lower()}",
    version=VERSION,
    description=DESCRIPTION,
    author=AUTHOR,
    author_email=AUTHOR_EMAIL,
    maintainer_email=AUTHOR_EMAIL,
    maintainer=AUTHOR, 
    url=WEBSITE,
    project_urls={
        "GitHub": GITHUB_LINK,
        "Website": WEBSITE
    },
    license="MIT",
    packages=find_packages(),
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    include_package_data=True,
    entry_points={
        'console_scripts': [
            'pras-cli = pras.__main__:main',
        ],
    },
    install_requires=[
        "requests>=2.20.0",
        "zeroconf",
        "prompt_toolkit",
        "inquirerpy",
        "notify_py",
        "tqdm",
        "prettytable",
        "pfzy"
        "certifi>=2022.9.24",
        "charset-normalizer>=2.1.1",
        "click>=8.1.3",
        "colorama>=0.4.6",
        "idna>=3.4",
        "ifaddr>=0.2.0",
        "jeepney>=0.8.0",
        "loguru>=0.6.0",
        "urllib3>=1.26.12"
    ],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: Linux",
        "Topic :: System :: Software Distribution",
        "Topic :: Utilities",
        "Intended Audience :: Developers",
        "Intended Audience :: System Administrators",
        "Intended Audience :: End Users/Desktop",
        "Environment :: Console",
        "Development Status :: 4 - Beta",
        ],
    python_requires='>=3.6', 
    keywords=[
        "CLI",
        "command-line",
        "automation",
        "tool",
        "scripting",
        "workflow",
        "productivity",
        "terminal",
        "command-line interface",
        "Python",
        "utility",
        "pras-cli",
        "system administration",
        "console",
        "cross-platform"
    ],
)

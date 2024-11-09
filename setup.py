from setuptools import setup, find_packages

setup(
    name="pras-cli",
    version="2024.11.2",
    description="A CLI tool",
    author="PRAS Samin",
    author_email="prassamin@gmail.com",
    url="https://github.com/PRASSamin/pras-cli",
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
        "Operating System :: OS Independent",
        "Topic :: CLI",
        "Intended Audience :: Everyone"
        "Environment :: Console"
        "Development Status :: 4 - Beta",
        ],
    python_requires='>=3.6', 
)

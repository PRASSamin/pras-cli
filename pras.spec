# -*- mode: python ; coding: utf-8 -*-

datas = [
    ('README.md', '.'),
    ('LICENSE.md', '.'),
    ('CHANGELOG.md', '.'),
    ('manifest.json', '.'),
    ('pras/icons', 'icons'),
]

a = Analysis(
    ['pras/__main__.py'],
    pathex=[],
    binaries=[],
    datas=datas,
    hiddenimports=[
        'zeroconf._utils.ipaddress', 
        'zeroconf._handlers.answers',       
    ],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=['altgraph', 'setuptools', 'packaging', 'pyinstaller-hooks-contrib', 'PyInstaller', 'nh3', 'zipp', 'rfc3986', 'Pygments', 'pycparser', 'pkginfo', 'more-itertools', 'mdurl', 'jaraco.context', 'docutils', 'requests-toolbelt', 'readme-renderer', 'markdown-it-py', 'jaraco.functools', 'jaraco.classes', 'importlib-metadata', 'cffi', 'rich', 'cryptography', 'SecretStorage', 'keyring', 'twine'],
    noarchive=False,
    optimize=0,
)

pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='pras-cli',
    debug=False,
    bootloader_ignore_signals=False,
    strip=True,   
    upx=True,  
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    onefile=True, 
)

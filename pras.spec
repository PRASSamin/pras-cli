# -*- mode: python ; coding: utf-8 -*-

a = Analysis(
    ['pras\\__main__.py'],
    pathex=[],
    binaries=[],
    datas=[
        ('pras\\icons\\*', 'icons'),
    ],
    hiddenimports=['zeroconf._utils.ipaddress', 'zeroconf._handlers.answers'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=['altgraph', 'setuptools', 'pywin32-ctypes', 'pefile', 'packaging', 'pyinstaller-hooks-contrib', 'PyInstaller'],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='pras',
    debug=False,
    bootloader_ignore_signals=False,
    strip=True,
    upx=True,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon=['pras\\icons\\prascli.ico'],
    contents_directory='.',
)


b = Analysis(
    ['pras\\win.py'],
    pathex=['pras'],
)

pyzb = PYZ(b.pure)

winexe = EXE(
    pyzb,
    b.scripts,
    exclude_binaries=True,
    name='win',
    console=True,
    icon=['pras\\icons\\prascli.ico'],
    contents_directory='.',
)

import pras

coll = COLLECT(
    exe,
    winexe,
    a.binaries + b.binaries,
    a.datas + b.datas,
    strip=False,
    upx=True,
    name=f'prascli-v{pras.__version__}',
)
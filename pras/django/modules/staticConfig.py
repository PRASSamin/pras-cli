SCRIPT = r'''
def staticConfigHandler():
    prj_name = config.get('project_name')
    packages = config.get('packages', [])

    staticConfig = """STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles') 
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'), 
]

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
"""

    urlConfig = """
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
else:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    """

    try:
        settings = importlib.import_module(f"{prj_name}.settings")
        settings_file = os.path.join(os.getcwd(), prj_name, 'settings.py')

        with open(settings_file, 'r') as f:
            lines = f.readlines()

        if not any("PRAS CLI" in line for line in lines):
            lines.insert(0, credits)

        line = None
        for line_num, line in enumerate(lines):
            if line.strip().startswith('STATIC_URL'):
                line = line_num
                del lines[line]
                break

        if line is None:
            return False

        lines.insert(line, staticConfig)

        with open(settings_file, 'w') as f:
            f.writelines(lines)

        global_urls = os.path.join(os.getcwd(), prj_name, 'urls.py')

        with open(global_urls, 'r') as f:
            lines = f.readlines()

        importSec = None
        for line_num, line in enumerate(lines):
            if line.strip().startswith('from'):
                importSec = line_num
                break
        
        lines.insert(importSec, 'from django.conf.urls.static import static\nfrom django.conf import settings\n')

        lines.insert(len(lines), urlConfig)

        with open(global_urls, 'w') as f:
            f.writelines(lines)

        return True
    except Exception as e:
        return False
'''
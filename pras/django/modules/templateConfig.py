SCRIPT = r"""
def templatesConfigHandler():
    prj_name = config['project_name']
    template_dir = config['template_dir_name']
    try:
        settings_file = os.path.join(os.getcwd(), prj_name, 'settings.py')
        settings = importlib.import_module(f"{prj_name}.settings")
        tem = settings.TEMPLATES[0]['DIRS']

        with open(settings_file, 'r') as f:
            lines = f.readlines()

        if not any("PRAS CLI" in line for line in lines):
            lines.insert(0, credits)
        

        os_import_present = any('import os' in line for line in lines)

        if not os_import_present:
            for line_num, line in enumerate(lines):
                if line.strip().startswith('from pathlib import Path'):
                    lines.insert(line_num + 1, 'import os\n')
                    break

        for line_num, line in enumerate(lines):
            if line.strip().startswith('TEMPLATES'):
                for inner_line_num in range(line_num, len(lines)):
                    if 'DIRS' in lines[inner_line_num]:
                        if len(tem) == 0:
                            lines[inner_line_num] = lines[inner_line_num].replace(
                                ']', f"os.path.join(BASE_DIR, '{template_dir}')]"
                            )
                            break
                break

        with open(settings_file, 'w') as f:
            f.writelines(lines)
        return True
    except Exception as e:
        return False
"""
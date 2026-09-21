import os

css_path = r'C:\xampp\htdocs\cadviewer_dev\app\css\cadviewer-core-styles.css'
with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

import_stmt = "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');\n\n"

if import_stmt.strip() not in content:
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(import_stmt + content)
    print("Added @import for Inter font to cadviewer-core-styles.css")
else:
    print("@import already exists in cadviewer-core-styles.css")

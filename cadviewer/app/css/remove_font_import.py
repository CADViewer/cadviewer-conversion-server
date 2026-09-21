import os

css_path = r'C:\xampp\htdocs\cadviewer_dev\app\css\cadviewer-core-styles.css'
with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

import_stmt = "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');\n\n"
content = content.replace(import_stmt, "")

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Removed Inter @import from cadviewer-core-styles.css")

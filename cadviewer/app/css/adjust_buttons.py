import os

css_path = r'C:\xampp\htdocs\cadviewer_dev\app\css\cadviewer-core-styles.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

new_css = """
/* Adjust modern outline button text 2px higher */
.cadviewer-core-styles .cv-modern-btn-outline,
.cadviewer-core-styles input.cv-modern-btn-outline {
    padding-top: 4px !important;
    padding-bottom: 8px !important;
}
"""

if '/* Adjust modern outline button text 2px higher */' not in css_content:
    with open(css_path, 'a', encoding='utf-8') as f:
        f.write('\n' + new_css)
    print('Adjusted button text padding!')
else:
    print('CSS already exists.')

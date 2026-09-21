import re

css_path = r'C:\xampp\htdocs\cadviewer_dev\app\css\cadviewer-core-styles.css'
with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the #cvjs_print_button block
target = r'.cadviewer-core-styles #cvjs_print_button\s*{[^}]*}'

new_style = """.cadviewer-core-styles #cvjs_print_button {
    background-color: #ffffff !important;
    color: #0A0042 !important;
    border: 1px solid #0A0042 !important;
    border-radius: 6px !important;
    padding: 4px 12px !important;
    font-weight: 500 !important;
    font-size: 13px !important;
    cursor: pointer !important;
    transition: all 0.2s !important;
    margin-top: 0 !important;
    float: right !important;
    display: inline-block !important;
    height: auto !important;
    min-height: auto !important;
    line-height: normal !important;
}"""

content = re.sub(target, new_style, content)

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Adjusted CSS for print button")

css_path = r'C:\xampp\htdocs\cadviewer_dev\app\css\cadviewer-core-styles.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

new_css = """
/* Hide legacy modal wrappers */
.cadviewer-core-styles [id^="layerList_"],
.cadviewer-core-styles [id^="selectCalibrate_"],
.cadviewer-core-styles [id^="print_"] {
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
    box-shadow: none !important;
}
"""

if '/* Hide legacy modal wrappers */' not in css_content:
    with open(css_path, 'a', encoding='utf-8') as f:
        f.write('\n' + new_css)
    print('Added CSS to hide legacy wrappers!')
else:
    print('CSS already exists.')

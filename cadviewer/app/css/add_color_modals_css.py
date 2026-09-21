import os

css_path = r'C:\xampp\htdocs\cadviewer_dev\app\css\cadviewer-core-styles.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# We need to override legacy CSS for the four color modals
css_overrides = """
/* BEGIN COLOR MODALS OVERRIDES */
.cadviewer-core-styles table.colorModalTable {
    width: 100% !important;
    height: auto !important;
    padding: 0 !important;
    border-spacing: 0 !important;
    border-collapse: separate !important;
}

.cadviewer-core-styles table.colorModalTable tr {
    height: auto !important;
    display: block !important;
    width: 100% !important;
}

.cadviewer-core-styles table.colorModalTable td {
    height: auto !important;
    display: block !important;
    width: 100% !important;
    padding: 0 !important;
    border: none !important;
    background: transparent !important;
}

/* Reset buttons and components to not be absolute */
.cadviewer-core-styles #cvjs_quickcountcolor_button,
.cadviewer-core-styles #cvjs_spaceobjectcolor_button,
.cadviewer-core-styles #cvjs_redlinecolor_button,
.cadviewer-core-styles #cvjs_backgroundcolor_button,
.cadviewer-core-styles #cvjs_genericcolor_button {
    position: static !important;
    left: auto !important;
    top: auto !important;
    margin: 0 !important;
    height: 32px !important;
    min-height: 32px !important;
    width: auto !important;
    padding: 6px 16px !important;
    background-color: #000000 !important;
    color: #ffffff !important;
    border-radius: 6px !important;
    font-weight: 500 !important;
    font-size: 13px !important;
    font-family: 'Inter', sans-serif !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    border: none !important;
    cursor: pointer !important;
    transition: background-color 0.2s !important;
}

.cadviewer-core-styles #cvjs_quickcountcolor_button:hover,
.cadviewer-core-styles #cvjs_spaceobjectcolor_button:hover,
.cadviewer-core-styles #cvjs_redlinecolor_button:hover,
.cadviewer-core-styles #cvjs_backgroundcolor_button:hover,
.cadviewer-core-styles #cvjs_genericcolor_button:hover {
    background-color: #333333 !important;
}

/* Modal text overrides */
.cadviewer-core-styles #cvjs_redline_color_picker_text,
.cadviewer-core-styles #cvjs_spaceobject_color_picker_text,
.cadviewer-core-styles #cvjs_background_color_picker_text,
.cadviewer-core-styles #cvjs_quickcount_color_picker_text {
    position: static !important;
    left: auto !important;
    top: auto !important;
}

/* Jscolor picker override */
.cadviewer-core-styles .cvjs_inputRedlineColorModal {
    position: static !important;
    left: auto !important;
    top: auto !important;
    margin: 0 !important;
}

/* Color radio button text */
.cadviewer-core-styles [id$="_color_blue_text"],
.cadviewer-core-styles [id$="_color_red_text"],
.cadviewer-core-styles [id$="_color_orange_text"],
.cadviewer-core-styles [id$="_color_yellow_text"],
.cadviewer-core-styles [id$="_color_green_text"],
.cadviewer-core-styles [id$="_color_purple_text"],
.cadviewer-core-styles [id$="_color_gray_text"],
.cadviewer-core-styles [id$="_color_brown_text"] {
    position: static !important;
    left: auto !important;
    top: auto !important;
    margin: 0 !important;
}

/* Color radio button icons */
.cadviewer-core-styles table.colorModalTable img[src*="color.png"] {
    position: static !important;
    left: auto !important;
    top: auto !important;
    margin: 0 !important;
}

/* END COLOR MODALS OVERRIDES */
"""

if "/* BEGIN COLOR MODALS OVERRIDES */" not in css:
    with open(css_path, 'a', encoding='utf-8') as f:
        f.write("\n" + css_overrides)
    print("Added color modals overrides to CSS")
else:
    print("Overrides already exist")

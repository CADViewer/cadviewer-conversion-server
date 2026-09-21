import re

css_path = r'C:\xampp\htdocs\cadviewer_dev\app\css\cvjs-core-styles.css'
with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Define the IDs we want to clear the absolute positioning for
target_ids = [
    "cvjs_printorientation_text", "cvjs_printmodal_paper", "cvjs_paperSize", "cvjs_paperOrientation",
    "cvjs_margin_text", "cvjs_margin_type", "cvjs_zeroweight_factor_text", "cvjs_zeroweight_factor",
    "cvjs_grayscale_checkbox", "cvjs_greyScaleLocation", "cvjs_grayScaleType", "cvjs_printpdf_checkbox",
    "printToPdfLocation", "cvjs_print_button", "cvjs_printtoscale_checkbox", "printToScaleLocation",
    "enterPrintToScaleValueLocation", "cvjs_printToScaleValue", "cvjs_custom_checkbox", "printCustomCheckbox",
    "cvjs_printModalTextboxVariablesLocation", "cvjs_printModalTextboxLocation_text", "cvjs_printModalDualTextboxLocation_text"
]

for target_id in target_ids:
    # Find the block for this ID
    pattern = r'(#' + target_id + r'\s*{)([^}]*)(})'
    def replacer(match):
        block = match.group(2)
        # Remove position: absolute !important or position: absolute
        block = re.sub(r'position\s*:\s*absolute\s*(?:!important)?\s*;?', '', block)
        # Remove left, top, right, bottom
        block = re.sub(r'(?:left|top|right|bottom)\s*:[^;]+;?', '', block)
        # return the updated block
        return match.group(1) + block + match.group(3)
        
    content = re.sub(pattern, replacer, content)

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Cleaned cvjs-core-styles.css")

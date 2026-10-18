const fs = require('fs');
let content = fs.readFileSync('C:/Users/caspe/Downloads/2000-LP1_Sep_28_H09_52.svg', 'utf8');
content = content.replace('<style id="cv_styles" type="text/css">', '<style id="cv_styles" type="text/css">\n.bRGB_new_color_8345 { stroke: #000000; fill: none; }\n');
fs.writeFileSync('C:/Users/caspe/Downloads/2000-LP1_Sep_28_H09_52_fixed.svg', content);

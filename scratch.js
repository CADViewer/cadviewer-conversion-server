const fs = require('fs');
const content = fs.readFileSync('C:/Users/caspe/Downloads/2000-LP1_Sep_28_H09_52.svg', 'utf8');
const layers = content.split('\n').filter(l => l.includes('<g id="layer_'));
console.log('Layers found:', layers.length);
layers.forEach(l => console.log(l.substring(0, 150)));

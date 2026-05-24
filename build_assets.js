const fs = require('fs');
const path = require('path');

const svgDirs = ['happy', 'mad', 'confused', 'excited', 'happy_wave'];
let output = 'const svgAssets = {\n';

svgDirs.forEach(dir => {
    output += `  "${dir}": {\n`;
    [1, 2].forEach(num => {
        let fileName = `${dir}${num}.svg`;
        // Handle the naming inconsistency for happy_wave
        if (dir === 'happy_wave') {
            fileName = `happy${num}.svg`;
        }
        if (!fs.existsSync(path.join(__dirname, dir, fileName))) {
            fileName = `${dir}${num}.svg`; // fallback
        }
        
        try {
            const svgContent = fs.readFileSync(path.join(__dirname, dir, fileName), 'utf8');
            // Escape backticks and newlines
            const escapedContent = svgContent.replace(/`/g, '\\`');
            output += `    "file${num}": \`${escapedContent}\`,\n`;
        } catch (e) {
            console.error('Missing file: ' + dir + '/' + fileName);
        }
    });
    output += `  },\n`;
});

output += '};\n';

fs.writeFileSync(path.join(__dirname, 'assets.js'), output);
console.log('assets.js generated successfully.');

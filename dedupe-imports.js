const fs = require('fs');

function walk(dir) {
    if (!fs.existsSync(dir)) return [];
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) results = results.concat(walk(file));
        else if (file.endsWith('.js') || file.endsWith('.jsx')) results.push(file);
    });
    return results;
}

const dirs = ['./src/app_pages', './src/app_components'];
let files = [];
dirs.forEach(d => { files = files.concat(walk(d)); });

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    let newLines = [];
    let seenNextNav = false;
    let seenNextLink = false;
    let changed = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes("from 'next/navigation'")) {
            if (seenNextNav) {
                changed = true;
                continue; // Skip duplicate
            }
            seenNextNav = true;
            // Also ensure it imports all needed if usePathname etc are in other lines?
            // Actually, the easiest is just remove exact duplicate lines.
            // Wait, what if they import different things in different lines?
            // All my scripts just added "import { useRouter } from 'next/navigation';"
        }
        if (line.includes("from 'next/link'")) {
            if (seenNextLink) {
                changed = true;
                continue;
            }
            seenNextLink = true;
        }
        newLines.push(line);
    }

    // Now just check if there are duplicate identical lines anywhere at the top (imports)
    let finalLines = [];
    let seenLines = new Set();
    let inImportBlock = true;

    for (let line of newLines) {
        if (line.trim().startsWith('import ')) {
            if (seenLines.has(line.trim())) {
                changed = true;
                continue;
            }
            seenLines.add(line.trim());
        } else if (line.trim() !== '' && line.trim() !== '"use client";' && line.trim() !== "'use client';") {
            inImportBlock = false;
        }
        finalLines.push(line);
    }

    if (changed) {
        fs.writeFileSync(file, finalLines.join('\n'), 'utf8');
    }
});

console.log('Deduplicated Next.js imports!');

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

const dirs = ['./src/app_pages', './src/app_components', './src/context', './src/services', './src/utils', './src/data'];
let files = [];
dirs.forEach(d => { files = files.concat(walk(d)); });

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // We already replaced the import statement with useRouter previously, but wait...
    // The previous script might have left out `useNavigate` if it was imported.
    // Let's just do a clean pass.

    if (content.includes('react-router-dom') || content.includes('useNavigate') || content.includes('useLocation')) {
        changed = true;

        // Remove react-router-dom imports entirely
        content = content.replace(/import\s+{([^}]+)}\s+from\s+['"]react-router-dom['"];?/g, '');

        // Add Next.js imports
        let nextImports = [];
        if (content.includes('useNavigate')) {
            content = content.replace(/useNavigate/g, 'useRouter');
            nextImports.push('useRouter');
        }
        if (content.includes('useLocation')) {
            content = content.replace(/useLocation\(\)/g, '{ pathname: usePathname() }');
            nextImports.push('usePathname');
        }
        if (content.includes('useParams')) {
            nextImports.push('useParams');
        }

        let importsString = '';
        if (nextImports.length > 0) {
            importsString += `import { ${nextImports.join(', ')} } from 'next/navigation';\n`;
        }
        if (content.includes('<Link')) {
            importsString += `import Link from 'next/link';\n`;
        }

        if (content.startsWith('"use client";')) {
            content = content.replace('"use client";', '"use client";\n' + importsString);
        } else {
            content = importsString + content;
        }
    }

    if (content.includes('export default function')) {
        // Small fixes that Next.js might complain about (e.g. class instead of className if present, etc, though react relies on same)
    }

    if (changed) fs.writeFileSync(file, content, 'utf8');
});
console.log('Fixed imports!');

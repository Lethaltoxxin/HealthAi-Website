const fs = require('fs');
const path = require('path');

function walk(dir) {
    if (!fs.existsSync(dir)) return [];
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.js') || file.endsWith('.jsx')) results.push(file);
        }
    });
    return results;
}

const dirs = ['./src/app_pages', './src/app_components', './src/context', './src/services', './src/utils', './src/data'];
let files = [];
dirs.forEach(d => { files = files.concat(walk(d)); });

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    if (content.includes('react-router-dom')) {
        content = content.replace(/import\s+{([^}]*?)}\s+from\s+['"]react-router-dom['"];/g, (match, imports) => {
            let replacements = [];
            if (imports.includes('useNavigate')) {
                replacements.push(`import { useRouter } from 'next/navigation';`);
                content = content.replace(/useNavigate\(\)/g, 'useRouter()');
            }
            if (imports.includes('Link')) {
                replacements.push(`import Link from 'next/link';`);
            }
            if (imports.includes('useParams') || imports.includes('useLocation')) {
                replacements.push(`import { useParams, usePathname } from 'next/navigation';`);
                content = content.replace(/useLocation\(\)/g, '{ pathname: usePathname() }');
            }
            if (imports.includes('Navigate')) {
                // Not supported easily, skip or map to standard redirect if possible
            }
            return replacements.join('\n');
        });
        changed = true;
    }

    // Add "use client" if it uses hooks
    if (file.endsWith('.jsx') && !content.includes('"use client"') && !content.includes("'use client'")) {
        if (content.includes('useState') || content.includes('useEffect') || content.includes('useRef') || content.includes('useRouter') || content.includes('useContext') || content.includes('framer-motion')) {
            content = `"use client";\n` + content;
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
    }
});

// Fix image imports if there's any absolute /assets/ - Next.js needs them from public or relative
// We copied assets to src/assets. Next.js can import them properly if paths are correct.

// Generate Next.js page wrappers
const pages = fs.readdirSync('./src/app_pages').filter(f => f.endsWith('.jsx'));
pages.forEach(p => {
    const name = p.replace('.jsx', '');
    const dirName = name.toLowerCase() === 'home' ? 'dashboard' : name.toLowerCase();
    fs.mkdirSync(`./src/app/${dirName}`, { recursive: true });

    // Use an alias or relative path (assuming @ is configured, but let's use relative to be safe)
    fs.writeFileSync(`./src/app/${dirName}/page.jsx`, `"use client";\nimport ${name} from '../../app_pages/${p}';\nexport default function Page() { return <${name} />; }\n`);
});

// Import the CSS into layout.js or globals.css
let globalsCss = fs.readFileSync('./src/app/globals.css', 'utf8');
if (!globalsCss.includes('theme.css')) {
    globalsCss = `@import '../theme.css';\n@import '../app_index.css';\n` + globalsCss;
    fs.writeFileSync('./src/app/globals.css', globalsCss, 'utf8');
}

console.log('Migration complete');

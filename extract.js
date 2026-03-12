const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'HealthAi-app', 'healthytogether.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const regex = /https:\/\/(?:cdn\.prod\.website-files\.com|res\.cloudinary\.com)[^"'\s\>]+/g;
const matches = html.match(regex);

if (matches) {
    const uniqueUrls = [...new Set(matches)].filter(url => !url.endsWith('.css') && !url.endsWith('.js'));
    const outPath = path.join(__dirname, 'urls.json');
    fs.writeFileSync(outPath, JSON.stringify(uniqueUrls, null, 2));
    console.log('Extracted ' + uniqueUrls.length + ' unique URLs to ' + outPath);
} else {
    console.log('No URLs found');
}

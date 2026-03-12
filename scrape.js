const https = require('https');
const fs = require('fs');

https.get('https://www.healthytogether.co/', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        fs.writeFileSync('healthytogether.html', data);
        console.log('HTML downloaded successfully. Size:', data.length);
    });
}).on('error', (err) => {
    console.error('Error fetching:', err.message);
});

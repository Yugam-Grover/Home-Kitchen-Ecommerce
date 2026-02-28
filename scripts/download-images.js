const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'assets', 'mock');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const images = Array.from({length: 15}).map((_, i) => "https://picsum.photos/seed/kitch" + i + "/400/500");

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 302 || res.statusCode === 301) {
                download(res.headers.location, dest).then(resolve).catch(reject);
            } else if (res.statusCode === 200) {
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else {
                reject(new Error("Failed to download " + url + ", status " + res.statusCode));
            }
        }).on('error', reject);
    });
};

(async () => {
    console.log('Downloading images...');
    for (let i = 0; i < images.length; i++) {
        try {
            await download(images[i], path.join(dir, 'img' + (i + 1) + '.jpg'));
            console.log('Downloaded img' + (i + 1) + '.jpg');
        } catch (e) {
            console.error(e.message);
        }
    }
    console.log('Done.');
})();

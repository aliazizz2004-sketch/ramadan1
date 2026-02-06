
const https = require('https');

const reciters = [
    'ar.alafasy',
    'ar.abdulbasitmurattal',
    'ar.abdullahbasfar',
    'ar.abdurrahmaansudais',
    'ar.shaatree',
    'ar.ahmedajamy',
    'ar.hanirifai',
    'ar.husary',
    'ar.mahermuaiqly',
    'ar.saoodshuraym'
];

const checkUrl = (url) => {
    return new Promise((resolve) => {
        const req = https.request(url, { method: 'HEAD' }, (res) => {
            resolve({ url, status: res.statusCode });
        });
        req.on('error', () => resolve({ url, status: 'ERROR' }));
        req.end();
    });
};

const run = async () => {
    console.log('Checking 128kbps...');
    for (const r of reciters) {
        const url = `https://cdn.islamic.network/quran/audio/128/${r}/1.mp3`;
        const res = await checkUrl(url);
        console.log(`${r} (128): ${res.status}`);
    }

    console.log('\nChecking 64kbps...');
    for (const r of reciters) {
        const url = `https://cdn.islamic.network/quran/audio/64/${r}/1.mp3`;
        const res = await checkUrl(url);
        console.log(`${r} (64): ${res.status}`);
    }
};

run();

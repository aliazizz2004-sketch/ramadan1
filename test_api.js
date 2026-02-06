
async function testSurah(id) {
    const urls = [
        `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranmunjaz/${id}.json`,
        `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/eng-abdulhaleem/${id}.json`,
        `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/kur-muhammadmahmoud/${id}.json`,
        `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/kur-tefsirareber/${id}.json`
    ];

    console.log(`Testing Surah ${id}...`);
    for (const url of urls) {
        try {
            const res = await fetch(url);
            if (res.ok) {
                console.log(`[OK] ${url}`);
                const data = await res.json();
                console.log(`  Structure: ${Object.keys(data).join(', ')}`);
                // Check if it has 'chapter' or 'verse'
                if (data.chapter) console.log(`  Chapter verses: ${data.chapter.length}`);
                else if (data.verse) console.log(`  Verse length: ${data.verse.length}`);
                else if (data.verses) console.log(`  Verses length: ${data.verses.length}`);
                else console.log(`  WARNING: No standard verse key found! Keys: ${Object.keys(data)}`);
            } else {
                console.log(`[FAIL] ${url} (Status: ${res.status})`);
            }
        } catch (err) {
            console.log(`[ERROR] ${url} (${err.message})`);
        }
    }
}

async function run() {
    await testSurah(1);
    await testSurah(114);
}

run();

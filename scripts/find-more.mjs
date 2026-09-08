import https from 'node:https';

function searchArchive(query) {
  return new Promise((resolve, reject) => {
    const url = 'https://archive.org/advancedsearch.php?q=' + encodeURIComponent(query + ' AND mediatype:(audio)') + '&fl[]=identifier,title&rows=15&output=json';
    https.get(url, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data).response.docs || []);
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', reject);
  });
}

function getFiles(id) {
  return new Promise((resolve) => {
    https.get('https://archive.org/metadata/' + id + '/files', (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => {
        try {
          const files = JSON.parse(data).result || [];
          const mp3s = files.filter(f => f.name && f.name.endsWith('.mp3') && !f.name.includes('_vbr') && !f.name.includes('_spectrogram'));
          resolve(mp3s.map(f => ({ id, name: f.name, size: f.size })));
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function run() {
  const queries = [
    'Akon I Wanna Love You',
    'Akon Belly Dancer',
    'Akon Bananza',
    'Akon Smack That',
    'Sean Paul Temperature',
    'Sean Paul Get Busy',
    'Sean Paul Press It Up',
  ];

  for (const q of queries) {
    console.log(`\n=== Query: ${q} ===`);
    const docs = await searchArchive(q);
    for (const doc of docs) {
      const files = await getFiles(doc.identifier);
      const matched = files.filter(f => {
        const lower = f.name.toLowerCase();
        return (lower.includes('akon') || lower.includes('sean') || lower.includes('wanna') || lower.includes('belly') || lower.includes('bananza') || lower.includes('temperature') || lower.includes('busy') || lower.includes('press'));
      });
      if (matched.length > 0) {
        console.log(`Matched in [${doc.identifier}]:`);
        matched.forEach(m => console.log(`  -> ${m.name} (${Math.round((m.size || 0)/1024/1024*10)/10} MB)`));
      }
    }
  }
}

run();

import https from 'node:https';

function searchArchive(query) {
  return new Promise((resolve) => {
    const url = 'https://archive.org/advancedsearch.php?q=' + encodeURIComponent(query) + '&fl[]=identifier,title&rows=50&output=json';
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
    }).on('error', () => resolve([]));
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
          const mp3s = files.filter(f => f.name && f.name.endsWith('.mp3'));
          resolve(mp3s.map(f => ({ id, name: f.name, size: f.size })));
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function run() {
  const docs = await searchArchive('Sean Paul mediatype:audio');
  for (const doc of docs) {
    const files = await getFiles(doc.identifier);
    const hits = files.filter(f => {
      const lower = f.name.toLowerCase();
      return lower.includes('temperature') || lower.includes('busy') || lower.includes('sean') || lower.includes('press');
    });
    if (hits.length > 0) {
      console.log(`[${doc.identifier}] ${doc.title}`);
      hits.forEach(h => console.log(`   - ${h.name} (${Math.round((h.size||0)/1024/1024*10)/10} MB)`));
    }
  }
}

run();

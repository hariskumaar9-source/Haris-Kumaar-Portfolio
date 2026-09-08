import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';

function searchArchive(query) {
  return new Promise((resolve, reject) => {
    const url = 'https://archive.org/advancedsearch.php?q=' + encodeURIComponent(query + ' AND mediatype:(audio)') + '&fl[]=identifier,title&rows=10&output=json';
    https.get(url, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data).response.docs);
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
          const mp3s = files.filter(f => f.name && f.name.endsWith('.mp3'));
          resolve(mp3s.map(f => ({ id, name: f.name, size: f.size })));
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function main() {
  const queries = [
    'Akon "I Wanna Love You"',
    'Akon "Belly Dancer"',
    'Akon "Bananza"',
    'Eminem "Lose Yourself"',
    'Tommy Richman "Million Dollar Baby"',
    'Sean Paul "Press It Up"',
    'Sean Paul "Temperature"',
    'Sean Paul "Get Busy"',
    'Shaggy "Boombastic"'
  ];

  for (const q of queries) {
    console.log(`\n🔍 Searching: ${q}`);
    const docs = await searchArchive(q);
    for (const doc of docs.slice(0, 4)) {
      const files = await getFiles(doc.identifier);
      if (files.length > 0) {
        console.log(`  📁 [${doc.identifier}] -> ${doc.title}`);
        files.forEach(f => console.log(`     - ${f.name} (${Math.round((f.size || 0)/1024/1024*10)/10} MB)`));
      }
    }
  }
}

main();

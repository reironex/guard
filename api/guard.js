import { writeFile } from 'fs/promises';
import { join } from 'path';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed');

  const appstate = req.body;
  if (!Array.isArray(appstate)) return res.status(400).send('Invalid appstate format');

  // Save appstate
  await writeFile(join(process.cwd(), 'appstate.json'), JSON.stringify(appstate, null, 2));

  // Call guard API
  try {
    const response = await fetch('http://141.11.167.247:6217/guard/fb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appstate)
    });
    const text = await response.text();
    res.status(200).send(`✅ Guard Activated!\n\n${text}`);
  } catch (e) {
    res.status(500).send('❌ Failed to contact the guard server.');
 
  }
}

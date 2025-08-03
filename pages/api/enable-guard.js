import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const { appstate } = req.body;
  if (!Array.isArray(appstate)) {
    return res.status(400).json({ message: 'Invalid AppState format' });
  }

  const cookie = appstate.map(c => `${c.name}=${c.value}`).join('; ');
  const uid = appstate.find(c => c.name === 'c_user')?.value;
  if (!uid || !cookie.includes('xs=')) {
    return res.status(400).json({ message: 'Missing c_user or xs cookie' });
  }

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': cookie,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  };
  const body = new URLSearchParams({
    av: uid,
    fb_api_req_friendly_name: 'ProfilePictureGuardMutation',
    fb_api_caller_class: 'RelayModern',
    doc_id: '1477043292367183',
    variables: JSON.stringify({
      is_shielded: true,
      actor_id: uid,
      client_mutation_id: '1',
    })
  });

  try {
    const fbRes = await axios.post('https://graph.facebook.com/graphql', body, { headers });
    const success = fbRes.data?.data?.profile_picture_guard?.is_shielded;
    if (success) {
      return res.status(200).json({ message: '✅ Profile Guard Enabled Successfully!' });
    } else {
      return res.status(200).json({ message: '⚠️ Failed to enable. Maybe AppState expired.' });
    }
  } catch (err) {
    return res.status(500).json({ message: '❌ Error: ' + err.message });
  }
}

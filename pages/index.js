import { useState } from 'react';

export default function Home() {
  const [appstate, setAppstate] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('/api/enable-guard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appstate: JSON.parse(appstate) })
      });
      const data = await res.json();
      setResponse(data.message);
    } catch (err) {
      setResponse('❌ Error sending request.');
    }
    setLoading(false);
  };

  return (
    <main className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">🛡 Facebook Profile Guard</h1>
      <textarea
        rows={10}
        className="w-full p-2 border rounded mb-4"
        placeholder='Paste AppState (JSON format)'
        value={appstate}
        onChange={(e) => setAppstate(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Enabling...' : 'Enable Profile Guard'}
      </button>
      {response && (
        <div className="mt-4 p-3 bg-gray-100 rounded border">{response}</div>
      )}
    </main>
  );
}

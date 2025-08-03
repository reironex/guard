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
    <main style={{ padding: '2rem', maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '1rem' }}>🛡 Facebook Profile Guard</h1>
      <textarea
        rows={10}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        placeholder="Paste AppState (JSON format)"
        value={appstate}
        onChange={(e) => setAppstate(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          background: '#1877f2',
          color: '#fff',
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Enabling...' : 'Enable Profile Guard'}
      </button>
      {response && (
        <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f0f2f5', borderRadius: '4px' }}>
          {response}
        </div>
      )}
    </main>
  );
}

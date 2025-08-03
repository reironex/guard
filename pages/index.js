import { useState } from "react";

export default function Home() {
  const [cookieInput, setCookieInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    try {
      const cookies = JSON.parse(cookieInput);

      const c_user = cookies.find(c => c.name === "c_user")?.value;
      const xs = cookies.find(c => c.name === "xs")?.value;

      if (!c_user || !xs) {
        setError("❌ Invalid cookies: Missing 'c_user' or 'xs'");
        setOutput("");
        return;
      }

      const appstate = [
        { key: "c_user", value: c_user },
        { key: "xs", value: xs }
      ];

      setOutput(JSON.stringify(appstate, null, 2));
      setError("");
    } catch (e) {
      setError("⚠️ Failed to convert. Invalid JSON?");
      setOutput("");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🛡️ Facebook AppState Generator</h1>

      <textarea
        placeholder="Paste full cookie JSON from browser..."
        value={cookieInput}
        onChange={(e) => setCookieInput(e.target.value)}
        rows={10}
        style={{ width: "100%", fontFamily: "monospace", marginBottom: 10 }}
      />

      <button onClick={handleConvert} style={{ padding: "8px 16px" }}>
        Convert to AppState
      </button>

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}

      {output && (
        <>
          <h3>✅ AppState</h3>
          <textarea
            readOnly
            value={output}
            rows={4}
            style={{ width: "100%", fontFamily: "monospace" }}
          />
        </>
      )}
    </div>
  );
}

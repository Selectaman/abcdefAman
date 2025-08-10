import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [html, setHtml] = useState('');
  const [ts, setTs] = useState('');
  const [css, setCss] = useState('');
  const [codes, setCodes] = useState([]);

  const saveCode = async () => {
    await axios.post('https://abcdefaman-backend.onrender.com/save', { html, ts, css });
    setHtml(''); setTs(''); setCss('');
    fetchCodes();
  };

  const fetchCodes = async () => {
    const res = await axios.get('https://abcdefaman-backend.onrender.com/codes');
    setCodes(res.data);
  };

  useEffect(() => { fetchCodes(); }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Save Code Snippet</h2>
      <textarea rows="4" cols="80" placeholder="HTML" value={html} onChange={e => setHtml(e.target.value)} /><br />
      <textarea rows="4" cols="80" placeholder="TS" value={ts} onChange={e => setTs(e.target.value)} /><br />
      <textarea rows="4" cols="80" placeholder="CSS" value={css} onChange={e => setCss(e.target.value)} /><br />
      <button onClick={saveCode}>Save Code</button>

      <h3>Saved Snippets</h3>
      {codes.map((code, i) => (
        <div key={i} style={{ border: '1px solid black', margin: 10, padding: 10 }}>
          <pre><b>HTML:</b> {code.html}</pre>
          <pre><b>TS:</b> {code.ts}</pre>
          <pre><b>CSS:</b> {code.css}</pre>
        </div>
      ))}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function Dashboard() {
  const [user, setUser] = useState({ name: '', balance: 0 });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/me').then(res => setUser(res.data));
    api.get('/history').then(res => setHistory(res.data.history));
  }, []);

  const requestAdvance = async () => {
    setLoading(true);
    const res = await api.post('/advance', { amount: 200 });
    setUser(prev => ({ ...prev, balance: res.data.new_balance }));
    const hist = await api.get('/history');
    setHistory(hist.data.history);
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bienvenue {user.name}</h1>
      <p>Solde : {user.balance} €</p>
      <button onClick={requestAdvance} disabled={loading}>
        {loading ? "Chargement..." : "Demander une avance"}
      </button>
      <h3>Historique</h3>
      <ul>
        {history.map((h, i) => <li key={i}>{h.date} - {h.amount} €</li>)}
      </ul>
    </div>
  );
}
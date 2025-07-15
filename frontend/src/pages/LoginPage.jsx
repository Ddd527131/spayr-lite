import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post('/login', { email, password });
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('role', res.data.role);
            navigate('/dashboard');
    } catch (e) {
      setError("Identifiants incorrects");
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Connexion</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
}
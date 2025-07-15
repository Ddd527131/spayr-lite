import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function AdminPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users').then(res => setUsers(res.data));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin - Liste des utilisateurs</h1>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.name} ({u.email}) - Solde: {u.balance}€</li>
        ))}
      </ul>
    </div>
  );
}
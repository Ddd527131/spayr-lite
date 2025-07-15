import { useEffect, useState } from 'react'
import axios from 'axios'

export default function SpayrLite() {
  const [user, setUser] = useState({ name: "Durand", balance: 1500 })
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const API_URL = "http://localhost:8000"

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_URL}/history`)
      setHistory(res.data.history)
    } catch (err) {
      setError("Erreur de récupération de l’historique.")
    }
  }

  const requestAdvance = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await axios.post(`${API_URL}/advance`, {
        username: user.name,
        amount: 200
      })

      if (res.data.error) {
        setError(res.data.error)
      } else {
        setUser(prev => ({ ...prev, balance: res.data.new_balance }))
        fetchHistory()
      }
    } catch (err) {
      setError("Erreur lors de la demande d’avance.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
      <h1>Spayr Lite</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginBottom: '1rem' }}>
        <p>Bonjour <strong>{user.name}</strong></p>
        <p>Solde actuel : <strong>{user.balance} €</strong></p>
      </div>

      <button onClick={requestAdvance} disabled={loading} style={{ marginBottom: '1rem' }}>
        {loading ? "Traitement..." : "Demander une avance (200€)"}
      </button>

      <div>
        <h2>Historique des avances</h2>
        <ul>
          {history.map((item, idx) => (
            <li key={idx}>{item.date} - {item.amount} €</li>
          ))}
        </ul>
      </div>
    </div>
  )
}


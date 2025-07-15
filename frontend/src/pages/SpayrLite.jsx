import { useEffect, useState } from 'react'
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import api from "../services/api"

export default function SpayrLite() {
  const [user, setUser] = useState({ name: "Durand", balance: 0 })
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Récupère le solde et l'historique depuis le backend
  const fetchData = async () => {
    try {
      // Récupère l'historique
      const histRes = await api.get("/history")
      setHistory(histRes.data.history)
      // Récupère le solde utilisateur
      const username = "Durand" // à remplacer par le vrai nom si besoin
      const dbRes = await api.get(`/user/${username}`)
      setUser({ name: username, balance: dbRes.data.balance })
    } catch (e) {
      setError("Erreur lors du chargement des données.")
    }
  }

  // Demande une avance
  const requestAdvance = async () => {
    setLoading(true)
    setError("")
    try {
      const username = "Durand" // à remplacer par le vrai nom si besoin
      const amount = 200
      const res = await api.post("/advance", { username, amount })
      if (res.data.error) {
        setError(res.data.error)
      } else {
        setUser(prev => ({ ...prev, balance: res.data.new_balance }))
        fetchData()
      }
    } catch (e) {
      setError("Erreur lors de la demande d'avance.")
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Spayr Lite</h1>

      {error && (
        <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">
          {error}
        </div>
      )}

      <Card className="mb-4">
        <CardContent>
          <p className="text-lg">Bonjour, <strong>{user.name}</strong></p>
          <p className="text-xl">Solde actuel : <strong>{user.balance} €</strong></p>
        </CardContent>
      </Card>

      <Button onClick={requestAdvance} disabled={loading} className="mb-4">
        {loading ? "Traitement..." : "Demander une avance (200€)"}
      </Button>

      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Historique des avances</h2>
          <ul className="space-y-1">
            {history.map((item, idx) => (
              <li key={idx} className="text-sm">{item.date} - {item.amount} €</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
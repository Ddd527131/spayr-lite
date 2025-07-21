# Spayr Lite

Spayr Lite est une application web permettant à un utilisateur de se connecter, de consulter son solde, de demander une avance sur salaire et de visualiser l’historique de ses avances.

## Fonctionnement

### 1. Connexion

- L’utilisateur se connecte avec son **email** et son **mot de passe**.
- Les identifiants sont vérifiés côté backend (FastAPI) à partir du fichier `db.json`.
- Si la connexion réussit, un token est stocké dans le navigateur et l’utilisateur est redirigé vers le tableau de bord.

### 2. Tableau de bord

- L’utilisateur voit son nom et son solde actuel.
- Il peut demander une avance de 200 € (si son solde est suffisant).
- Chaque avance est enregistrée dans l’historique et le solde est mis à jour.

### 3. Historique

- L’historique affiche la liste des avances demandées avec la date et le montant.

## Exemple d’utilisateur par défaut

Dans le fichier `backend/db.json` :

```json
{
    "users": {
        "Durand": {
            "email": "durand@example.com",
            "password": "test1234",
            "balance": 100.0
        }
    },
    "history": []
}
```

**Identifiants de connexion :**
- Email : `durand@example.com`
- Mot de passe : `test4321`

## Lancer l’application

### Backend (FastAPI)

```sh
cd backend
uvicorn main:app --reload
```

### Frontend (React)

```sh
cd frontend
npm install
npm start
```

- Le backend écoute sur [http://localhost:8000](http://localhost:8000)
- Le frontend écoute sur [http://localhost:3000](http://localhost:3000)

## Structure du projet

```
spayr-lite/
├── backend/
│   ├── main.py
│   └── db.json
└── frontend/
    ├── src/
    │   ├── App.js
    │   ├── pages/
    │   │   ├── LoginPage.jsx
    │   │   └── SpayrLite.jsx
    │   └── components/
    │       └── ProtectedRoute.jsx
    └── package.json
```

## Auteur

- DONKOU NGOUADOU DURAND ADMIN

---

N’hésitez pas à proposer des améliorations ou à signaler des bugs via GitHub

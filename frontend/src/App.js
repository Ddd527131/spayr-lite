import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SpayrLite from './pages/SpayrLite';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
    const isAuthenticated = !!localStorage.getItem('token');
    const isAdmin = localStorage.getItem('role') === 'admin';

    return ( <
        Routes >
        <
        Route path = "/login"
        element = { < LoginPage / > }
        /> <
        Route path = "/dashboard"
        element = { <
            ProtectedRoute isAllowed = { isAuthenticated } >
            <
            SpayrLite / >
            <
            /ProtectedRoute>
        }
        /> <
        Route path = "/admin"
        element = { <
            ProtectedRoute isAllowed = { isAuthenticated && isAdmin } >
            <
            AdminPage / >
            <
            /ProtectedRoute>
        }
        /> <
        Route path = "*"
        element = { < Navigate to = "/login" / > }
        /> < /
        Routes >
    );
}
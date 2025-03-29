// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './styles.css'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verifica el estado de autenticación al cargar la aplicación
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Guarda el estado en localStorage
  };

  // Función para cerrar sesión (opcional)
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Elimina el estado de localStorage
  };

  return (
    <Router>
      <Routes>
        {/* Ruta para iniciar sesión */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" /> // Redirige al dashboard si ya está logueado
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Ruta para registro */}
        <Route path="/register" element={<Register />} />

        {/* Ruta para el panel de administración */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" /> // Redirige al login si no está autenticado
            )
          }
        />

        {/* Redirección predeterminada */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../api'; 

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
        console.log({ username, password });
      const response = await axios.post(`${API_URL}/api/login`, {
        username,
        password,
      });
      if (response.data.message === "Inicio de sesión exitoso") {
        localStorage.setItem('isLoggedIn', 'true');
        onLogin();
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Iniciar Sesión</button>
        <p>
          ¿No tienes una cuenta?{' '}
          <a href="/register">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
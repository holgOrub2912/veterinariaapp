// src/components/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { API_URL } from '../api';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para navegar entre rutas

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/usuarios`, {
        nombre,
        cedula,
        password,
      });
      if (response.data.message === "Usuario registrado exitosamente") {
        alert("Registro exitoso. Inicia sesión.");
        navigate('/login'); // Redirige al usuario a la pantalla de login
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Hubo un error al registrar el usuario. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Registro</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cédula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Registrarse</button>
      </div>
    </div>
  );
};

export default Register;
// src/components/Dashboard.jsx
import React, { useState } from 'react';

const Dashboard = () => {
  const [citas, setCitas] = useState([]);
  const [examenes, setExamenes] = useState([]);

  const agregarCita = (fecha, hora) => {
    const nuevaCita = { fecha, hora };
    setCitas([...citas, nuevaCita]);
    localStorage.setItem('citas', JSON.stringify([...citas, nuevaCita]));
  };

  const solicitarExamen = (tipoExamen) => {
    const nuevoExamen = { tipoExamen };
    setExamenes([...examenes, nuevoExamen]);
    localStorage.setItem('examenes', JSON.stringify([...examenes, nuevoExamen]));
  };

  return (
    <div className="dashboard">
      <h2>Panel de Administración</h2>
      <h3>Agendar Cita</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const fecha = new Date().toISOString().split('T')[0];
          const hora = new Date().toLocaleTimeString();
          agregarCita(fecha, hora);
        }}
      >
        <button type="submit">Agendar Cita</button>
      </form>

      <h3>Solicitar Examen</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const tipoExamen = prompt("Ingrese el tipo de examen:");
          if (tipoExamen) {
            solicitarExamen(tipoExamen);
          }
        }}
      >
        <button type="submit">Solicitar Examen</button>
      </form>

      <h3>Citas Agendadas</h3>
      <ul>
        {citas.map((cita, index) => (
          <li key={index}>
            Fecha: {cita.fecha}, Hora: {cita.hora}
          </li>
        ))}
      </ul>

      <h3>Examenes Solicitados</h3>
      <ul>
        {examenes.map((examen, index) => (
          <li key={index}>
            Tipo de Examen: {examen.tipoExamen}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
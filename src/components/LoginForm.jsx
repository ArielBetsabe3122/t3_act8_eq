import { useState } from 'react';
import { loginUser } from '../services/authService';

export const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos

    // 1. Validación de campos vacíos antes del fetch
    if (!username.trim() || !password.trim()) {
      setError('Por favor, llena todos los campos.');
      return;
    }

    setLoading(true);

    try {
      // 2. Llamada al servicio de la API
      const userData = await loginUser(username, password);
      
      // 3. Si es exitoso, pasamos los datos del usuario al componente padre (App.jsx)
      onLoginSuccess(userData);
    } catch (err) {
      // 4. Manejo de errores de credenciales incorrectas
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card">
        <div className="usuario-container">
         <img src="/img/login.png" alt="user" className="user-a" />
         </div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
        <div className="label-container">
          <label>Usuario</label>
          <img src="/img/iconoCorreo.png" alt="user" className="input-icon"/>
        </div>
          <input type="text" className="glass-input" value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ej.user "
          />
        </div>
 
        <div className="input-group">
        <div className="label-container">
          <label>Contraseña</label>
          <img src="/img/iconoContraseña.png" alt="password" className="input-icon"/>
          </div>
          <input 
            type="password" 
            className="glass-input"
            value={password}
            onChange={(e) => setUsername(e.target.value)} // Corrección menor: vincula a setPassword
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ej. emilyspass"
          />
        </div>

        {error && <p className="error-text"> {error}</p>}

        <button type="submit" className="glass-btn" disabled={loading}>
          {loading ? 'Cargando...' : 'ENTRAR'}
        </button>
      </form>
    </div>
  );
};
import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null); // Regresa al login al borrar el estado del usuario
  };

  return (
    <div className="app-container">
      {!user ? (
        // Si no hay usuario, se muestra el Login
        <LoginForm onLoginSuccess={setUser} />
      ) : (
        // Si hay usuario, se protege la vista mostrando el Dashboard
        <div className="dashboard-layout">
          {/* Aquí irá el Sidebar de tu compañera */}
          <aside style={{ width: '250px', background: '#f0f0f0' }}>
            <p>Menú Lateral (Sidebar)</p>
          </aside>

          <div className="main-content" style={{ flex: 1 }}>
            {/* Navbar simulado con la foto de la API y el botón de Cerrar Sesión */}
            <header style={{ padding: '10px', background: '#ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={user.image} alt={user.username} style={{ width: '40px', borderRadius: '50%' }} />
                <span>Bienvenido, {user.firstName} {user.lastName}</span>
              </div>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </header>

            <main style={{ padding: '20px' }}>
              <h3>Aquí irá tu Tabla de Datos (Fase 3)</h3>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

export default App

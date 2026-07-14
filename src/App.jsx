import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
<<<<<<< HEAD
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { ProductsTable } from './components/ProductsTable';
=======
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
>>>>>>> bd1ff86217e1d817ccf9afe0314864040549f702
import './App.css'

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
<<<<<<< HEAD
    setUser(null);
=======
    setUser(null); // Regresa al login al borrar el estado del usuario
>>>>>>> bd1ff86217e1d817ccf9afe0314864040549f702
  };

  return (
    <div className="app-container">
      {!user ? (
        <LoginForm onLoginSuccess={setUser} />
      ) : (
        <div className="dashboard-layout">
          <Sidebar />

          <div className="main-content">
            <Navbar user={user} onLogout={handleLogout} />

            <main className="glass-card content-card">
              <ProductsTable />
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

<<<<<<< HEAD
export default App
=======
export default App
>>>>>>> bd1ff86217e1d817ccf9afe0314864040549f702

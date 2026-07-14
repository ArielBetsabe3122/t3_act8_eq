import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { ProductsTable } from './components/ProductsTable';
import './App.css'

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
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

export default App

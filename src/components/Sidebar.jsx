import { useState } from 'react';

const MENU_ITEMS = [
  { key: 'inicio', label: 'Inicio', icon: '🏠' },
  { key: 'usuarios', label: 'Usuarios', icon: '👤' },
  { key: 'reportes', label: 'Reportes', icon: '📈' },
  { key: 'config', label: 'Configuración', icon: '⚙️' },
];

export const Sidebar = () => {
  // Simulamos navegación: solo resalta la opción activa, no cambia de página real.
  const [active, setActive] = useState('dashboard');

  return (
    <aside className="glass-card sidebar-glass">
      <h2 className="sidebar-title">Mi Sistema</h2>
      <nav>
        <ul className="sidebar-menu">
          {MENU_ITEMS.map((item) => (
            <li
              key={item.key}
              className={`sidebar-item ${active === item.key ? 'active' : ''}`}
              onClick={() => setActive(item.key)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
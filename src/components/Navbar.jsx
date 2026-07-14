export const Navbar = ({ user, onLogout }) => {
  return (
    <header className="glass-card navbar-glass">
      <div className="navbar-user">
        <img
          src={user.image}
          alt={user.username}
          className="navbar-avatar"
        />
        <span className="navbar-username">
          {user.firstName} {user.lastName}
          <small>@{user.username}</small>
        </span>
      </div>

      <button className="glass-btn logout-btn" onClick={onLogout}>
        Cerrar sesión
      </button>
    </header>
  );
};
import { useState } from 'react';
import AdminOrdersPanel from '../components/adminOrdersPanel';

const Admin = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (usuario === 'Avenida50Admin' && contrasena === 'Avenida502026') {
      setIsLoggedIn(true);
      setError(null);
      return;
    }
    setError('Usuario o contraseña incorrectos.');
  };

  const handleGoHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsuario('');
    setContrasena('');
    setError(null);
  };

  return (
    <div className="admin-page-wrapper">
      <div className="admin-page-header">
        <button className="back-button admin-back" onClick={handleGoHome}>
          ← Volver al inicio
        </button>
      </div>

      <div className="admin-page-content">
        {!isLoggedIn ? (
          <div className="admin-login-card">
            <h2>Acceso de Administrador</h2>
            <form className="admin-login-form" onSubmit={handleSubmit}>
              <label>
                Usuario
                <input
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder="Usuario"
                  autoComplete="username"
                />
              </label>
              <label>
                Contraseña
                <input
                  type="password"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  placeholder="Contraseña"
                  autoComplete="current-password"
                />
              </label>
              {error && <p className="admin-error">{error}</p>}
              <button type="submit" className="admin-login-submit">
                Entrar
              </button>
            </form>
          </div>
        ) : (
          <div className="admin-page-panel">
            <div className="admin-panel-header">
              <h2>Panel de Pedidos</h2>
              <button className="admin-logout-btn" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
            <AdminOrdersPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;

import { useState, useEffect } from 'react';
import axios from 'axios';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dishes, setDishes] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);

  const links = [
    { path: '/', label: 'Inicio' },
    { path: '/carta', label: 'Carta' },
    { path: '/nosotros', label: 'Nosotros' },
    { path: '/pedir', label: 'Pedir' },
    { path: '/contacto', label: 'Contacto' },
  ];

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    setIsMenuOpen(false);
    setSearchFocused(false);
  };

  const handleNavClick = (event, path) => {
    event.preventDefault();
    navigate(path);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/dishes');
        setDishes(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('Error loading dishes for search', err);
      }
    };
    fetchDishes();
  }, []);

  return (
    <nav className="navbar">

      {/* LOGO */}
      <img src="/LogoAvenida.png" alt="Logo" className="logo" />

      {/* LINKS DESKTOP */}
      <div className="nav-links">
        {links.map((link) => (
          <a key={link.path} href={link.path} onClick={(e) => handleNavClick(e, link.path)}>
            {link.label}
          </a>
        ))}
      </div>

      {/* SEARCH BAR */}
      <div className="search-bar-wrapper">
        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Buscar..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
          />
          <button type="submit" className="search-button">🔍</button>
        </form>
      </div>

      {/* INSTAGRAM ICON */}
      <a
        href="https://www.instagram.com/50avenida/"
        target="_blank"
        rel="noopener noreferrer"
        className="instagram-btn"
      >
        <svg className="instagram-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07..." />
        </svg>
      </a>

      {/* HAMBURGER BUTTON */}
      <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span><span></span><span></span>
      </button>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="nav-mobile">
          {links.map((link) => (
            <a key={link.path} href={link.path} onClick={(e) => handleNavClick(e, link.path)}>
              {link.label}
            </a>
          ))}
        </div>
      )}

    </nav>
  );
};

export default NavBar;

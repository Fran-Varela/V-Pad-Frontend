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
        <form
          className="search-bar"
          onSubmit={(e) => {
            e.preventDefault();
            // On enter, go to first matched dish if any
            const match = dishes.find((d) =>
              d.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
            );
            if (match) navigate(`/carta?dishId=${match.id}`);
            else navigate('/carta');
            setSearchQuery('');
            setSearchFocused(false);
          }}
        >
          <input
            type="text"
            placeholder="Buscar..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => {
              // close suggestions shortly after blur to allow click
              setTimeout(() => setSearchFocused(false), 150);
            }}
          />
          <button
            type="submit"
            className="search-button"
            aria-label="Buscar"
          >
            🔍
          </button>

          {/* Suggestions dropdown */}
          {searchFocused && searchQuery.trim() !== '' && (
            <div className="search-suggestions">
              {dishes
                .filter((d) => d.name.toLowerCase().includes(searchQuery.trim().toLowerCase()))
                .slice(0, 6)
                .map((d) => (
                  <button
                    key={d.id}
                    className="search-suggestion-item"
                    onMouseDown={(ev) => {
                      // onMouseDown fires before blur — use it to navigate
                      ev.preventDefault();
                      navigate(`/carta?dishId=${d.id}`);
                      setSearchQuery('');
                      setSearchFocused(false);
                    }}
                  >
                    {d.name}
                  </button>
                ))}
              {dishes.filter((d) => d.name.toLowerCase().includes(searchQuery.trim().toLowerCase())).length === 0 && (
                <div className="search-suggestion-item">No hay resultados</div>
              )}
            </div>
          )}
        </form>
      </div>

      {/* INSTAGRAM ICON */}
      <a
        href="https://www.instagram.com/50avenida/"
        target="_blank"
        rel="noopener noreferrer"
        className="instagram-btn"
        aria-label="Instagram"
      >
        <svg className="instagram-icon" viewBox="0 0 24 24" fill="currentColor" role="img">
          <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm4.25 5.75a4.25 4.25 0 100 8.5 4.25 4.25 0 000-8.5zM18 6.5a.75.75 0 110 1.5.75.75 0 010-1.5z" />
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

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
    if (window.location.href !== `${window.location.origin}${path}`) {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    setIsMenuOpen(false);
    setSearchFocused(false);
  };

  const handleNavClick = (event, path) => {
    event.preventDefault();
    navigate(path);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      navigate('/carta');
      return;
    }

    const exactMatch = dishes.find(
      (dish) => dish.name.toLowerCase() === trimmedQuery.toLowerCase()
    );
    const partialMatch = dishes.find((dish) =>
      dish.name.toLowerCase().includes(trimmedQuery.toLowerCase())
    );

    const selectedDish = exactMatch || partialMatch;
    if (selectedDish) {
      navigate(`/carta?dishId=${selectedDish.id}`);
    } else {
      navigate(`/carta?search=${encodeURIComponent(trimmedQuery)}`);
    }
    setSearchQuery('');
  };

  const handleSuggestionClick = (dish) => {
    setSearchQuery(dish.name);
    navigate(`/carta?dishId=${dish.id}`);
  };

  const filteredSuggestions = searchQuery
    ? dishes
        .filter((dish) =>
          dish.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  return (
    <nav>
      <img src="/LogoAvenida.png" alt="Logo Avenida" className="logo" width={150} height={100} />

      <div className={`nav-links ${isMenuOpen ? 'nav-links-mobile' : ''}`}>
        {links.map((link) => (
          <a key={link.path} href={link.path} onClick={(event) => handleNavClick(event, link.path)}>
            {link.label}
          </a>
        ))}
      </div>

      <div className="search-bar-wrapper">
        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            name="search"
            placeholder="Buscar en la carta..."
            className="search-input"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onFocus={() => setSearchFocused(true)}
          />
          <button type="submit" className="search-button" aria-label="Buscar">
            🔍
          </button>
        </form>

        {searchFocused && filteredSuggestions.length > 0 && (
          <div className="search-suggestions">
            {filteredSuggestions.map((dish) => (
              <button
                type="button"
                key={dish.id}
                className="search-suggestion-item"
                onClick={() => handleSuggestionClick(dish)}
              >
                {dish.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <a href="https://www.instagram.com/50avenida/" target="_blank" rel="noopener noreferrer" className="instagram-link" aria-label="Follow us on Instagram">
        <svg className="instagram-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </a>

      <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>
    </nav>
  );
};

export default NavBar;

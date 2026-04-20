import React from 'react';

const Nosotros = () => {
  return (
    <div className="about-wrapper">
      {/* Hero */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="about-hero-content">
          <span className="hero-tagline">SMASH BURGER ARTISANS</span>
          <h1 className="about-hero-title">Avenida 50</h1>
          <div className="hero-divider"></div>
          <p className="about-hero-subtitle">
            Donde la técnica del <span>smash</span> se encuentra con la calidad premium.
          </p>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <div className="about-story-inner">
            <div className="about-story-image-container">
              <div className="image-accent"></div>
              <img src="/imagenTemporal.avif" alt="Nuestra historia" className="about-story-img" />
            </div>
            <div className="about-story-text">
              <span className="section-label">NUESTRO ORIGEN</span>
              <h2>Pasión por el <br/><span>Smash Perfecto</span></h2>
              <p>
                Avenida 50 no es solo una hamburguesería; es el resultado de meses de experimentación 
                buscando la costra perfecta, el punto exacto de la carne y el equilibrio de sabores.
              </p>
              <p>
                Traemos la técnica auténtica del smash a la ciudad: carne 100% vacuno seleccionada, 
                presionada al momento para caramelizar cada fibra y mantener la jugosidad interior.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section */}
      <section className="about-new-section">
        <div className="container">
          <div className="new-section-inner">
            <div className="new-section-text">
              <span className="section-label">NUESTRA COCINA</span>
              <h2>El Arte del <br/><span>Smash Perfecto</span></h2>
              <p>
                En Avenida 50, cada hamburguesa es una obra maestra. Nuestros chefs expertos 
                dominan la técnica del smash para crear esa corteza dorada y crujiente que 
                hace que nuestras burgers sean inolvidables.
              </p>
              <p>
                Utilizamos ingredientes frescos y de la más alta calidad, desde carnes 
                seleccionadas hasta vegetales orgánicos, todo preparado con pasión y 
                dedicación para ofrecerte la mejor experiencia culinaria.
              </p>
            </div>
            <div className="new-section-photos">
              <img src="/imagenTemporal.avif" alt="Nuestra cocina" className="photo-main" />
              <img src="/imagenTemporal.avif" alt="Proceso de preparación" className="photo-secondary" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="about-gallery">
        <div className="container">
          <h2 className="section-title">El Templo de la Burger</h2>
          <div className="bento-gallery">
            <div className="gallery-item tall"><img src="/imagenTemporal.avif" alt="G1" /></div>
            <div className="gallery-item"><img src="/imagenTemporal.avif" alt="G2" /></div>
            <div className="gallery-item"><img src="/imagenTemporal.avif" alt="G3" /></div>
            <div className="gallery-item wide"><img src="/imagenTemporal.avif" alt="G4" /></div>
            <div className="gallery-item"><img src="/imagenTemporal.avif" alt="G5" /></div>
            <div className="gallery-item"><img src="/imagenTemporal.avif" alt="G6" /></div>
            <div className="gallery-item wide"><img src="/imagenTemporal.avif" alt="G7" /></div>
          </div>
        </div>
      </section>

      {/* Cta */}
      <section className="about-cta">
        <div className="cta-content">
          <img src="/imagenTemporal.avif" alt="Avenida 50" className="cta-icon" />
          <h2 className="cta-title">¿Hambre de algo real?</h2>
          <p className="cta-text">Únete a la experiencia Avenida 50 hoy mismo. Descubre el arte del smash perfecto.</p>
          <div className="cta-buttons">
            <a href="/carta" className="about-cta-button">
              EXPLORAR MENÚ
              <span className="btn-arrow">→</span>
            </a>
            <a href="/pediraqui" className="about-cta-button">
              PEDIR AHORA
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;
const Pedir = () => {
  const handleNavigation = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="pedir-container">
      <div className="pedir-cards-row">
        {/* Eat here */}
        <fieldset
          className="game-card pedir-card"
          onClick={() => handleNavigation('/pedir/aqui')}
          role="button"
          tabIndex="0"
          onKeyDown={(e) => e.key === 'Enter' && handleNavigation('/pedir/aqui')}
        >
          <h2 className="game-title">Pedir Aquí</h2>
          <p className="game-description">
            Elige tus platos favoritos y come en nuestro local.
          </p>
        </fieldset>

        {/* Take away */}
        <fieldset
          className="game-card pedir-card"
          onClick={() => handleNavigation('/pedir/adomicilio')}
          role="button"
          tabIndex="0"
          onKeyDown={(e) => e.key === 'Enter' && handleNavigation('/pedir/adomicilio')}
        >
          <h2 className="game-title">Pedir a Domicilio</h2>
          <p className="game-description">
            Haz tu pedido a domicilio aquí y recibe la comida directamente en tu puerta.
          </p>
        </fieldset>
      </div>
    </div>
  );
};

export default Pedir;

import { useState } from 'react';
import Ingredients from '../components/ingredients';
import Dishes from '../components/dishes';
import Orders from '../components/orders';

const PedirADomicilio = () => {
  const [cart, setCart] = useState([]);

  const handleGoBack = () => {
    window.history.pushState({}, '', '/pedir');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleGoAdmin = () => {
    window.history.pushState({}, '', '/admin');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleAddToCart = (item) => {
    setCart(prev => [...prev, item]);
  };

  return (
    <div className="pedir-page-wrapper">
      <div className="pedir-top-actions">
        <button className="back-button" onClick={handleGoBack}>← Volver</button>
        <button className="admin-access-btn" onClick={handleGoAdmin}>
          👤 Acceder
        </button>
      </div>

      <div className="pedir-page-layout">
        <div className="pedir-dishes-container">
          <section className="ingredients-section">
            <h3>Ingredientes disponibles</h3>
            <Ingredients />
          </section>

          <section className="dishes-section">
            <div className="dishes-section-header">
              <h3>Platos disponibles</h3>
            </div>
            <Dishes onAddToCart={handleAddToCart} />
          </section>
        </div>

        <div className="pedir-cart-container">
          <section className="orders-section">
            <Orders cart={cart} setCart={setCart} sourceLabel="Pedir a Domicilio" />
          </section>
        </div>
      </div>
    </div>
  );
};

export default PedirADomicilio;

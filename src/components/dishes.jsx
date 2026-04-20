import { useEffect, useState } from 'react';
import axios from 'axios';

const Dishes = ({ onAddToCart }) => {
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/dishes');
        setDishes(response.data); 
      } catch (err) {
        setError("No se cargaron los platos.");
        console.error(err);
      }
    };

    fetchDishes();
  }, []);

  const handleDishClick = (dish) => {
    setSelectedDish(dish);
    setQuantity(1);
  };

  const handleCloseModal = () => {
    setSelectedDish(null);
    setQuantity(1);
  };

  const handleAddToCart = (item) => {
    if (onAddToCart) {
      onAddToCart(item);
    }
  };

  const handleAddFromModal = () => {
    if (onAddToCart && selectedDish) {
      onAddToCart({
        dishId: selectedDish.id,
        name: selectedDish.name,
        price: selectedDish.price,
        quantity: quantity
      });
      handleCloseModal();
    }
  };

  if (error) return <p style={{color: 'red'}}>{error}</p>;

  return (
    <>
      <div className="dishes-grid">
        {dishes.map((dish) => (
          <div 
            key={dish.id} 
            className="dish-card"
            onClick={() => handleDishClick(dish)}
            style={{ cursor: 'pointer' }}
          >
            <img 
              src="/imagenTemporal.avif" 
              alt={dish.name}
              className="dish-card-image"
            />
            
            <div className="dish-card-content">
              <h4>{dish.name}</h4>
              
              <div className="dish-card-price-row">
                <div className="dish-card-price">${dish.price}</div>
                <button 
                  className="dish-quick-add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart({
                      dishId: dish.id,
                      name: dish.name,
                      price: dish.price,
                      quantity: 1
                    });
                  }}
                  title="Añadir al carrito"
                >
                  +
                </button>
              </div>
              
              <p className="dish-card-description">{dish.description}</p>
              
              <div 
                className="dish-card-allergens"
                onClick={(e) => e.stopPropagation()}
                title="Alérgenos"
              >
                <span className="allergen-icon" title="Gluten">🌾</span>
                <span className="allergen-icon" title="Carne">🥩</span>
                <span className="allergen-icon" title="Lácteos">🧈</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Dish Modal */}
      {selectedDish && (
        <div className="dish-modal-overlay" onClick={handleCloseModal}>
          <div className="dish-modal" onClick={(e) => e.stopPropagation()}>
            <button className="dish-modal-close" onClick={handleCloseModal}>✕</button>
            
            <img 
              src="/imagenTemporal.avif" 
              alt={selectedDish.name}
              className="dish-modal-image"
            />
            
            <div className="dish-modal-content">
              <h2>{selectedDish.name}</h2>
              
              <div className="dish-modal-price">${selectedDish.price}</div>
              
              <p className="dish-modal-description">{selectedDish.description}</p>
              
              <div className="dish-modal-ingredients">
                <h4>Ingredientes:</h4>
                <p>{selectedDish.ingredients || 'No especificados'}</p>
              </div>

              <div className="dish-modal-allergens">
                <h4>Alérgenos:</h4>
                <div className="allergens-list">
                  <div className="allergen-item">
                    <span className="allergen-icon">🌾</span>
                    <span className="allergen-name">Gluten</span>
                  </div>
                  <div className="allergen-item">
                    <span className="allergen-icon">🥩</span>
                    <span className="allergen-name">Carne</span>
                  </div>
                  <div className="allergen-item">
                    <span className="allergen-icon">🧈</span>
                    <span className="allergen-name">Lácteos</span>
                  </div>
                  <div className="allergen-item">
                    <span className="allergen-icon">🥜</span>
                    <span className="allergen-name">Frutos Secos</span>
                  </div>
                  <div className="allergen-item">
                    <span className="allergen-icon">🐟</span>
                    <span className="allergen-name">Pescado</span>
                  </div>
                  <div className="allergen-item">
                    <span className="allergen-icon">🦐</span>
                    <span className="allergen-name">Mariscos</span>
                  </div>
                </div>
              </div>

              <div className="dish-modal-controls">
                <div className="quantity-selector">
                  <button 
                    className="qty-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    −
                  </button>
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="qty-input"
                    min="1"
                  />
                  <button 
                    className="qty-btn"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <button 
                  className="dish-modal-add-btn"
                  onClick={handleAddFromModal}
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dishes;
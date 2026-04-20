import { useState, useEffect } from "react";
import axios from "axios";

const Carta = () => {
  const [dishes, setDishes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [itemType, setItemType] = useState(null); // 'product', 'dish', or 'ingredient'
  const [searchDishId, setSearchDishId] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [dishesRes, ingredientsRes] = await Promise.all([
          axios.get('http://localhost:8080/api/dishes'),
          axios.get('http://localhost:8080/api/ingredients')
        ]);
        setDishes(dishesRes.data);
        setIngredients(ingredientsRes.data);
      } catch (err) {
        console.error('Error', err);
        setError('Ha habido un error al cargar la carta. Por favor, inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dishId = params.get('dishId');
    setSearchDishId(dishId);
  }, []);

  useEffect(() => {
    if (!searchDishId || dishes.length === 0) return;

    const selectedDish = dishes.find((dish) => String(dish.id) === String(searchDishId));
    if (selectedDish) {
      setProductoSeleccionado(selectedDish);
      setItemType('dish');
    }
  }, [searchDishId, dishes]);

  const retryFetch = () => {
    setLoading(true);
    setError(null);
    const fetchAllData = async () => {
      try {
        const [dishesRes, ingredientsRes] = await Promise.all([
          axios.get('http://localhost:8080/api/dishes'),
          axios.get('http://localhost:8080/api/ingredients')
        ]);
        setDishes(dishesRes.data);
        setIngredients(ingredientsRes.data);
      } catch (err) {
        console.error('Error', err);
        setError('Ha habido un error al cargar la carta. Por favor, inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  };

  if (loading) {
    return (
      <fieldset className="menu-fieldset">
        <h2 className="menu-title">Carta</h2>
        <div className="menu-scroll">
          <p>Cargando menú...</p>
        </div>
      </fieldset>
    );
  }

  if (error) {
    return (
      <fieldset className="menu-fieldset">
        <h2 className="menu-title">Carta</h2>
        <div className="menu-scroll">
          <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>
          <button onClick={retryFetch} className="retry-btn">
            Intentar de nuevo
          </button>
        </div>
      </fieldset>
    );
  }

  return (
    <fieldset className="menu-fieldset">
      <h2 className="menu-title">Carta</h2>

      <div className="menu-scroll">
        {/* Dishes Section */}
        {dishes.length > 0 && (
          <section className="category">
            <h3 className="category-title">Platos Recomendados</h3>
            <div className="products-grid">
              {dishes.map((dish) => (
                <div
                  key={dish.id}
                  className="product-card"
                  onClick={() => {
                    setProductoSeleccionado(dish);
                    setItemType('dish');
                  }}
                >
                  <img src={dish.image || '/imagenTemporal.avif'} alt={dish.name} className="product-img" />
                  <div className="card-info">
                    <h4>{dish.name}</h4>
                    <p className="product-price">${dish.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Ingredients Section */}
        {ingredients.length > 0 && (
          <section className="category">
            <h3 className="category-title">Ingredientes Destacados</h3>
            <div className="products-grid">
              {ingredients.map((ing) => (
                <div
                  key={ing.id}
                  className="product-card"
                  onClick={() => {
                    setProductoSeleccionado(ing);
                    setItemType('ingredient');
                  }}
                >
                  <img src={ing.image || '/imagenTemporal.avif'} alt={ing.name} className="product-img" />
                  <div className="card-info">
                    <h4>{ing.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Modal */}
      {productoSeleccionado && (
        <div className="modal-overlay" onClick={() => {
          setProductoSeleccionado(null);
          setItemType(null);
        }}>
          <div className="modal modal-expanded" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => {
                setProductoSeleccionado(null);
                setItemType(null);
              }}
            >
              ✕
            </button>

            <img
              src={
                itemType === 'product'
                  ? productoSeleccionado.imagen
                  : productoSeleccionado.image || '/imagenTemporal.avif'
              }
              alt={itemType === 'product' ? productoSeleccionado.nombre : productoSeleccionado.name}
              className="modal-img-large"
            />

            <div className="modal-content">
              <h3 className="modal-title">
                {itemType === 'product'
                  ? productoSeleccionado.nombre
                  : productoSeleccionado.name}
              </h3>

              {(itemType === 'product' || itemType === 'dish') && productoSeleccionado.descripcion && (
                <p className="modal-description">
                  {productoSeleccionado.descripcion || productoSeleccionado.description}
                </p>
              )}

              {itemType === 'product' && productoSeleccionado.alergenos && (
                <>
                  <h4 className="modal-subtitle">Alérgenos</h4>
                  <ul className="modal-allergens">
                    {productoSeleccionado.alergenos.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </>
              )}

              <p className="modal-price">
                {itemType === 'product'
                  ? productoSeleccionado.precio
                  : `$${productoSeleccionado.price || 'N/A'}`}
              </p>
            </div>
          </div>
        </div>
      )}
    </fieldset>
  );
};

export default Carta;

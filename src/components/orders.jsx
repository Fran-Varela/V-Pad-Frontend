import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/components.css';

const Orders = ({ cart = [], setCart = () => {}, sourceLabel = '' }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [selectedDishId, setSelectedDishId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [tableNumber, setTableNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/orders');
        setOrders(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError("No se cargaron los pedidos.");
        console.error(err);
      }
    };

    const fetchDishes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/dishes');
        setDishes(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error cargando los platos:", err);
      }
    };

    fetchOrders();
    fetchDishes();

  }, []);

  const deleteOrder = async (id) => {
    await axios.delete(`http://localhost:8080/api/orders/${id}`);
    setOrders(orders.filter(order => order.id !== id));
  };

  const addToCart = () => {
    if (!selectedDishId) return;
    const dish = dishes.find(d => d.id === parseInt(selectedDishId));

    setCart(prev => [
      ...prev,
      {
        dishId: dish.id,
        name: dish.name,
        price: dish.price,
        quantity: quantity
      }
    ]);
    
    setSelectedDishId("");
    setQuantity(1);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const createOrderFromCart = async () => {
    if (cart.length === 0) {
      setFormError('Agrega al menos un plato antes de confirmar el pedido.');
      return;
    }

    if (sourceLabel === 'Pedir Aquí' && !tableNumber) {
      setFormError('Selecciona el número de mesa antes de enviar el pedido.');
      return;
    }

    if (sourceLabel === 'Pedir a Domicilio') {
      if (!customerName || !customerPhone || !customerAddress) {
        setFormError('Completa nombre, teléfono y dirección antes de enviar el pedido.');
        return;
      }
    }

    const newOrder = {
      items: cart.map(item => ({
        dishId: item.dishId,
        quantity: item.quantity
      })),
      source: sourceLabel
    };

    if (sourceLabel === 'Pedir Aquí') {
      newOrder.tableNumber = Number(tableNumber);
    }

    if (sourceLabel === 'Pedir a Domicilio') {
      newOrder.customerName = customerName;
      newOrder.customerPhone = customerPhone;
      newOrder.customerAddress = customerAddress;
    }

    await axios.post("http://localhost:8080/api/orders", newOrder);

    // Fetch orders again to see the new order in the list
    const response = await axios.get("http://localhost:8080/api/orders");
    setOrders(Array.isArray(response.data) ? response.data : []);
    setCart([]);
    setFormError(null);
    setTableNumber('');
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="pedir-cart-wrapper">
      {/* Shopping Cart Display */}
      <div className="pedir-cart-ui">
        <h3>Tu Carrito</h3>

        {sourceLabel === 'Pedir Aquí' && (
          <div className="order-meta-section">
            <label className="order-meta-label">
              Mesa
              <select
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="order-meta-input"
              >
                <option value="">Selecciona mesa</option>
                {Array.from({ length: 30 }, (_, index) => index + 1).map((mesa) => (
                  <option key={mesa} value={mesa}>{mesa}</option>
                ))}
              </select>
            </label>
          </div>
        )}

        {sourceLabel === 'Pedir a Domicilio' && (
          <div className="order-meta-section">
            <label className="order-meta-label">
              Nombre
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="order-meta-input"
                placeholder="Nombre"
              />
            </label>
            <label className="order-meta-label">
              Teléfono
              <input
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="order-meta-input"
                placeholder="Teléfono"
              />
            </label>
            <label className="order-meta-label">
              Dirección
              <input
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="order-meta-input"
                placeholder="Dirección"
              />
            </label>
          </div>
        )}

        {formError && <p className="form-error">{formError}</p>}

        {/* Dish Selector */}
        <div style={{ marginBottom: '20px' }}>
          <select 
            value={selectedDishId} 
            onChange={(e) => setSelectedDishId(e.target.value)}
            className="pedir-dish-select"
          >
            <option value="">Selecciona un plato</option>
            {dishes.map(dish => (
              <option key={dish.id} value={dish.id}>
                {dish.name} - ${dish.price}
              </option>
            ))}
          </select>

          <div className="pedir-qty-input-group">
            <input
              type='number'
              min='1'
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="pedir-qty-input"
            />
            <button 
              onClick={addToCart}
              className="pedir-add-btn"
            >
              +
            </button>
          </div>
        </div>

        {/* Cart Items Display */}
        {cart.length === 0 ? (
          <div className="pedir-cart-empty">
            Carrito vacío
          </div>
        ) : (
          <>
            <div className="pedir-cart-items">
              {cart.map((item, index) => (
                <div key={index} className="pedir-cart-item">
                  <div className="pedir-cart-item-name">{item.name}</div>
                  <div className="pedir-cart-item-qty">Cantidad: {item.quantity}</div>
                  <div className="pedir-cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="pedir-remove-btn"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Total */}
            <div className="pedir-cart-total">
              <div className="pedir-cart-total-label">Total</div>
              <div className="pedir-cart-total-amount">${cartTotal}</div>
            </div>

            {/* Create Order Button */}
            <button 
              onClick={createOrderFromCart} 
              className="pedir-cart-button"
            >
              Confirmar Pedido
            </button>
          </>
        )}
      </div>

      {/* ORDERS code */}
      <div style={{ display: 'none' }}>
        <div>
          <h3>Historial de Pedidos</h3>
          {orders.length === 0 ? (
            <p>No hay pedidos registrados.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {orders.map((order) => (
                <div key={order.id} style={{ border: '1px solid #444', padding: '15px', borderRadius: '10px' }}>
                  <p><strong>Pedido ID:</strong> {order.id}</p>
                  <p><strong>Fecha:</strong> {new Date(order.date).toLocaleString()}</p>
                  <p><strong>Estado:</strong> {order.status}</p>

                  <div style={{ marginLeft: '20px', fontSize: '0.9em', color: '#666' }}>
                    <strong>Productos:</strong>
                    <ul>
                      {(order.details || []).map((detail, index) => (
                        <li key={index}>
                          {detail.dish.name || `Plato ID: ${detail.dishId}`} - Cantidad: {detail.quantity}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => deleteOrder(order.id)}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginTop: "10px"
                      }}
                    >
                      Eliminar
                    </button>

                  </div>

                  <p><strong>Total:</strong> {order.total}€</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
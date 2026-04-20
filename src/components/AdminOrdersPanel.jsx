import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrdersPanel = ({ sourceLabel }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/orders');
        setOrders(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('Error loading admin orders:', err);
        setError('No se pudieron cargar los pedidos del panel.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatItems = (order) => {
    const items = order.details || order.items || [];
    if (!Array.isArray(items) || items.length === 0) {
      return <li>No hay artículos registrados.</li>;
    }

    return items.map((item, index) => {
      const name = item.dish?.name || item.name || `Plato ID: ${item.dishId || item.productId || index}`;
      const quantity = item.quantity ?? item.cantidad ?? 1;
      return (
        <li key={index}>
          {name} — Cantidad: {quantity}
        </li>
      );
    });
  };

  if (loading) {
    return <p>Cargando panel de pedidos...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="admin-orders-panel">
      <h3>Panel de Pedidos</h3>
      {orders.length === 0 ? (
        <p>No hay pedidos registrados.</p>
      ) : (
        <div className="admin-orders-list">
          {orders.map((order) => {
            const orderSource = order.source || sourceLabel || 'Desconocido';
            const orderDate = order.date || order.createdAt || order.timestamp || null;
            const orderTotal = order.total || order.amount || null;
            const orderTable = order.tableNumber || order.table || null;
            const orderName = order.customerName || order.customer?.name || null;
            const orderPhone = order.customerPhone || order.customer?.phone || null;
            const orderAddress = order.customerAddress || order.customer?.address || null;

            return (
              <div key={order.id || `${orderDate}-${orderSource}`} className="admin-order-card">
                <div className="admin-order-header">
                  <span><strong>ID:</strong> {order.id || 'N/A'}</span>
                  <span><strong>Origen:</strong> {orderSource}</span>
                </div>
                {orderDate && <p><strong>Fecha:</strong> {new Date(orderDate).toLocaleString()}</p>}
                {orderTable && <p><strong>Mesa:</strong> {orderTable}</p>}
                {orderName && <p><strong>Nombre:</strong> {orderName}</p>}
                {orderPhone && <p><strong>Teléfono:</strong> {orderPhone}</p>}
                {orderAddress && <p><strong>Dirección:</strong> {orderAddress}</p>}
                <p><strong>Artículos:</strong></p>
                <ul>{formatItems(order)}</ul>
                {orderTotal !== null && <p><strong>Total:</strong> ${orderTotal}</p>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPanel;

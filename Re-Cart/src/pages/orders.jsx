// pages/orders.js
import Navbar from '../components/Navbar';
import { useOrders } from '../context/OrdersContext';

export default function Orders() {
  const { orders } = useOrders();

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="main-content">
        <h1 className="heading-primary">My Orders</h1>
        {orders.length === 0 ? (
          <p className="text-muted">No orders yet.</p>
        ) : (
          <div className="order-list">
            {orders.map((order) => (
              <div
                key={order.id}
                className="order-item"
                style={{ padding: '1.5rem', background: 'var(--bg-white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border-color)' }}
              >
                <div style={{ display: 'flex', gap: '1.5rem', flex: 1 }}>
                  <img 
                    src={(order.product?.images?.length > 0) ? order.product.images[0] : (order.product?.image || 'https://via.placeholder.com/300?text=No+Image')} 
                    alt={order.product?.name || 'Unknown Product'} 
                    style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} 
                  />
                  <div>
                    <p style={{ fontWeight: '700', fontSize: '1.2rem', marginBottom: '0.25rem' }}>{order.product?.name || order.product || 'Unknown Product'}</p>
                    <p className="text-muted">Order ID: {order._id || order.id}</p>
                    <p className="text-muted">Date: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : order.date}</p>
                    <p className="text-muted">Amount: <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>₹{order.amount}</span></p>
                  </div>
                </div>
                <span
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    backgroundColor: order.status === 'Delivered' ? '#D1FAE5' : order.status === 'Out for Delivery' ? '#DBEAFE' : '#FEF3C7',
                    color: order.status === 'Delivered' ? '#059669' : order.status === 'Out for Delivery' ? '#2563EB' : '#D97706'
                  }}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useOrders } from '../context/OrdersContext';
import { useAuth } from '../context/AuthContext';

export default function DashboardNotifications() {
  const [notifications, setNotifications] = useState([]);
  const { orders } = useOrders();
  const { user } = useAuth();

  useEffect(() => {
    // Filter orders based on user role to ensure they only see their own product activity
    let roleOrders = orders;
    if (user?.role === 'seller') {
      roleOrders = orders.filter(o => o.sellerId === user?._id);
    }
    
    const latestOrder = roleOrders && roleOrders.length > 0 ? roleOrders[0] : null;
    const productName = latestOrder ? (latestOrder.product?.name || latestOrder.product || 'Unknown Product') : 'Sony PlayStation 5';

    const role = user?.role || 'buyer';
    let mockData = [];

    if (role === 'buyer') {
      mockData = [
        { _id: '1', message: `Your order for "${productName}" has been shipped and is out for delivery!`, createdAt: new Date().toISOString() },
        { _id: '2', message: 'Price drop alert: The iPad Pro you viewed is now 5% off.', createdAt: new Date(Date.now() - 3600000).toISOString() },
        { _id: '3', message: 'Welcome to Re-Cart! Start browsing our premium collection.', createdAt: new Date(Date.now() - 86400000).toISOString() }
      ];
    } else if (role === 'seller') {
      mockData = [
        { _id: '1', message: `You have a new order pending for "${productName}". Please review it.`, createdAt: new Date().toISOString() },
        { _id: '2', message: `Your listing for "${productName}" is getting a lot of views!`, createdAt: new Date(Date.now() - 3600000).toISOString() },
        { _id: '3', message: 'Welcome to your Seller Dashboard! Start managing your inventory.', createdAt: new Date(Date.now() - 86400000).toISOString() }
      ];
    } else if (role === 'agent') {
      mockData = [
        { _id: '1', message: `You have been assigned a new delivery for "${productName}".`, createdAt: new Date().toISOString() },
        { _id: '2', message: 'A new optimized route is available for your pending deliveries.', createdAt: new Date(Date.now() - 3600000).toISOString() },
        { _id: '3', message: 'Welcome to the Delivery Agent Dashboard.', createdAt: new Date(Date.now() - 86400000).toISOString() }
      ];
    }
    
    setNotifications(mockData);
  }, [orders, user]);

  return (
    <div className="notifications-panel" style={{ background: 'var(--bg-dashboard-box)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)' }}>
      <h2 className="heading-secondary">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-muted">No new notifications</p>
      ) : (
        <ul className="notification-list" style={{ listStyle: 'none', padding: 0 }}>
          {notifications.map((note) => (
            <li key={note._id} className="notification-item" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <p style={{ fontWeight: 500 }}>{note.message}</p>
              <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                {new Date(note.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

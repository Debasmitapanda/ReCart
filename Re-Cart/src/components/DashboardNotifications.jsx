// components/DashboardNotifications.js
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashboardNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Mock notifications data
        const mockData = [
          { _id: '1', message: 'Your order #1024 has been shipped and is out for delivery!', createdAt: new Date().toISOString() },
          { _id: '2', message: 'Price drop alert: The iPad Pro you viewed is now 5% off.', createdAt: new Date(Date.now() - 3600000).toISOString() },
          { _id: '3', message: 'Welcome to Re-Cart! Start browsing our premium collection.', createdAt: new Date(Date.now() - 86400000).toISOString() }
        ];
        
        setNotifications(mockData);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="notifications-panel" style={{ background: 'var(--bg-white)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
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

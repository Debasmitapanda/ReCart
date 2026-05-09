import { useState, useEffect } from 'react';
import { useOrders } from '../context/OrdersContext';
import { useAuth } from '../context/AuthContext';

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { orders } = useOrders();
  const { user } = useAuth();

  useEffect(() => {
    const latestOrder = orders && orders.length > 0 ? orders[0] : null;
    const productName = latestOrder ? (latestOrder.product?.name || latestOrder.product || 'Unknown Product') : 'Dell Laptop';
    
    const role = user?.role || 'buyer';
    let mockData = [];

    if (role === 'buyer') {
      mockData = [
        { id: 1, message: `Your order for "${productName}" has been shipped.`, time: '2h ago' },
        { id: 2, message: 'Price drop alert: The iPad Pro you viewed is now 5% off.', time: '1d ago' },
        { id: 3, message: 'Delivery agent picked up your item.', time: '3d ago' },
      ];
    } else if (role === 'seller') {
      mockData = [
        { id: 1, message: `New order received for "${productName}".`, time: '2h ago' },
        { id: 2, message: 'Your payment for the last sale has been processed.', time: '1d ago' },
        { id: 3, message: 'Reminder: Update tracking for pending orders.', time: '3d ago' },
      ];
    } else if (role === 'agent') {
      mockData = [
        { id: 1, message: `New delivery assigned: "${productName}".`, time: '2h ago' },
        { id: 2, message: 'Buyer requested contact regarding delivery.', time: '1d ago' },
        { id: 3, message: 'Weekly performance report available.', time: '3d ago' },
      ];
    }

    setNotifications(mockData);
  }, [orders, user]);

  const unreadCount = notifications.length;

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 z-50">
          <h3 className="font-semibold mb-2">Notifications</h3>
          {notifications.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">No new notifications.</p>
          ) : (
            <ul className="space-y-2">
              {notifications.map((note) => (
                <li
                  key={note.id}
                  className="border-b pb-2 text-sm text-gray-700 dark:text-gray-200"
                >
                  <p>{note.message}</p>
                  <span className="text-xs text-gray-500">{note.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

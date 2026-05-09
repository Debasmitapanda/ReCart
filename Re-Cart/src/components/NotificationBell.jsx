// components/NotificationBell.js
import { useState } from 'react';

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, message: 'Your order ORD001 has been shipped.', time: '2h ago' },
    { id: 2, message: 'Seller confirmed your purchase of Dell Laptop.', time: '1d ago' },
    { id: 3, message: 'Delivery agent picked up iPhone 12.', time: '3d ago' },
  ]);

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

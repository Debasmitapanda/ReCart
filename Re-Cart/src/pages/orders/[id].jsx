// pages/orders/[id].js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

let socket;

export default function OrderTracking() {
    const { id } = useParams();
  
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    if (!id) return;
    socket = io(import.meta.env.VITE_BACKEND_URL);

    socket.emit('joinOrderRoom', id);

    socket.on('deliveryUpdate', (update) => {
      setUpdates((prev) => [...prev, update]);
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  return (
    <div className="page-wrapper main-content" style={{ maxWidth: '600px' }}>
      <h1 className="heading-primary">Order Tracking</h1>
      <ul className="tracking-list" style={{ listStyle: 'none', padding: 0 }}>
        {updates.map((u, i) => (
          <li key={i} className="tracking-item" style={{ padding: '1rem', background: 'var(--bg-white)', borderLeft: '4px solid var(--primary)', marginBottom: '1rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
            <p style={{ fontWeight: '600' }}>Status: {u.status}</p>
            {u.location && <p className="text-muted">Location: {u.location}</p>}
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(u.time).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

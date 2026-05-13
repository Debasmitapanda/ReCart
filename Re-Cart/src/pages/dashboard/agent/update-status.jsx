import { useState } from 'react';
import DashboardSidebar from '../../../components/DashboardSidebar';
import Navbar from '../../../components/Navbar';
import { useOrders } from '../../../context/OrdersContext';

export default function UpdateStatus() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { orders, updateOrderStatus } = useOrders();
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState('Out for Delivery');
  const [message, setMessage] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    
    // Find the order
    const orderExists = orders.find(o => o.id === orderId);
    if (!orderExists) {
      setMessage(`Error: Order ${orderId} not found.`);
      return;
    }

    updateOrderStatus(orderId, status);
    setMessage(`Success: Order ${orderId} has been successfully updated to ${status}.`);
    setOrderId('');
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="dashboard-layout">
        <button 
          className="sidebar-toggle-mobile"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{ display: 'none' }}
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? '✕' : '☰'}
        </button>

        <div style={{ position: 'relative' }}>
          <DashboardSidebar role="agent" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>
        <main className="main-content" style={{ padding: '2rem', flex: 1, width: '100%' }}>
          <h1 className="heading-primary" style={{ marginBottom: '2rem' }}>Update Delivery Status</h1>
          
          <div style={{ background: 'var(--bg-white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', padding: '2rem', maxWidth: '600px', border: '1px solid var(--border-color)' }}>
            <form onSubmit={handleUpdate}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Order ID</label>
                <input 
                  type="text" 
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. ORD001"
                  className="form-control"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                  required
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-main)' }}>New Status</label>
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-control"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                >
                  <option value="Seller Confirmed">Seller Confirmed</option>
                  <option value="Picked Up">Picked Up</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              {message && (
                <div style={{ padding: '1rem', marginBottom: '1.5rem', borderRadius: 'var(--radius-md)', backgroundColor: message.startsWith('Error') ? '#FEE2E2' : '#D1FAE5', color: message.startsWith('Error') ? '#B91C1C' : '#065F46', fontWeight: '500' }}>
                  {message}
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
                Update Status
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

import DashboardSidebar from '../../../components/DashboardSidebar';
import Navbar from '../../../components/Navbar';
import { useOrders } from '../../../context/OrdersContext';
import { useState } from 'react';

export default function AssignedDeliveries() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { orders, updateOrderStatus } = useOrders();

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    alert(`Order ${orderId} status updated to ${newStatus}`);
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
          <h1 className="heading-primary" style={{ marginBottom: '2rem' }}>Assigned Deliveries</h1>
          
          <div style={{ background: 'var(--bg-white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflowX: 'auto', border: '1px solid var(--border-color)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-light)', color: 'var(--text-muted)', borderBottom: '2px solid var(--border-color)', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '1.2rem 1.5rem', fontWeight: 600 }}>Order ID</th>
                  <th style={{ padding: '1.2rem 1.5rem', fontWeight: 600 }}>Product</th>
                  <th style={{ padding: '1.2rem 1.5rem', fontWeight: 600 }}>Customer Details</th>
                  <th style={{ padding: '1.2rem 1.5rem', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '1.2rem 1.5rem', fontWeight: 600 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '2rem' }}>📦</span>
                        <span>No deliveries assigned yet.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  orders.map((order, index) => (
                    <tr key={order.id} style={{ 
                      borderBottom: index !== orders.length - 1 ? '1px solid var(--border-color)' : 'none',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '1.5rem' }}>
                        <span style={{ fontFamily: 'monospace', background: 'var(--bg-light)', padding: '0.3rem 0.6rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                          #{order.id.toString().slice(-6)}
                        </span>
                      </td>
                      <td style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'var(--bg-light)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {(order.product?.images?.[0] || order.product?.image) ? (
                              <img src={order.product?.images?.[0] || order.product?.image} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No Img</span>
                            )}
                          </div>
                          <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{order.product?.name || order.product || 'Unknown Product'}</span>
                        </div>
                      </td>
                      <td style={{ padding: '1.5rem' }}>
                        <div style={{ fontSize: '0.9rem' }}>
                          <p style={{ fontWeight: '600', marginBottom: '0.25rem', color: 'var(--text-main)' }}>{order.customer}</p>
                          <p className="text-muted" style={{ marginBottom: '0.25rem', fontSize: '0.85rem' }}>📍 {order.address}</p>
                          <p className="text-muted" style={{ fontSize: '0.85rem' }}>📞 {order.contact}</p>
                        </div>
                      </td>
                      <td style={{ padding: '1.5rem' }}>
                        <span style={{
                          padding: '0.4rem 0.8rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          backgroundColor: order.status === 'Delivered' ? 'rgba(16, 185, 129, 0.15)' : order.status === 'Out for Delivery' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                          color: order.status === 'Delivered' ? '#059669' : order.status === 'Out for Delivery' ? '#2563EB' : '#D97706',
                          display: 'inline-block',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          {order.status}
                        </span>
                      </td>
                      <td style={{ padding: '1.5rem' }}>
                        <select
                          className="form-control"
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          style={{ 
                            padding: '0.6rem 2rem 0.6rem 1rem', 
                            borderRadius: 'var(--radius-md)', 
                            border: '1px solid var(--border-color)', 
                            fontSize: '0.9rem',
                            background: 'var(--bg-light)',
                            color: 'var(--text-main)',
                            cursor: 'pointer',
                            fontWeight: 500,
                            appearance: 'none',
                            backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.7rem top 50%',
                            backgroundSize: '0.65rem auto'
                          }}
                        >
                          <option value="Delivery Agent Assigned">Assigned</option>
                          <option value="Picked Up">Picked Up</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

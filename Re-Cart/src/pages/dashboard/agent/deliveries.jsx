import DashboardSidebar from '../../../components/DashboardSidebar';
import Navbar from '../../../components/Navbar';
import { useOrders } from '../../../context/OrdersContext';

export default function AssignedDeliveries() {
  const { orders, updateOrderStatus } = useOrders();

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    alert(`Order ${orderId} status updated to ${newStatus}`);
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
        <DashboardSidebar role="agent" />
        <main className="main-content" style={{ flex: 1, padding: '2rem' }}>
          <h1 className="heading-primary" style={{ marginBottom: '2rem' }}>Assigned Deliveries</h1>
          
          <div style={{ background: 'var(--bg-white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-light)', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '1rem 1.5rem' }}>Order ID</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Product</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Customer Details</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Status</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No deliveries assigned.
                    </td>
                  </tr>
                ) : (
                  orders.map((order, index) => (
                    <tr key={order.id} style={{ borderBottom: index !== orders.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                      <td style={{ padding: '1.5rem', fontWeight: 'bold' }}>{order.id}</td>
                      <td style={{ padding: '1.5rem' }}>{order.product}</td>
                      <td style={{ padding: '1.5rem' }}>
                        <div style={{ fontSize: '0.9rem' }}>
                          <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{order.customer}</p>
                          <p className="text-muted" style={{ marginBottom: '0.25rem' }}>{order.address}</p>
                          <p className="text-muted">{order.contact}</p>
                        </div>
                      </td>
                      <td style={{ padding: '1.5rem' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          backgroundColor: order.status === 'Delivered' ? '#D1FAE5' : order.status === 'Out for Delivery' ? '#DBEAFE' : '#FEF3C7',
                          color: order.status === 'Delivered' ? '#059669' : order.status === 'Out for Delivery' ? '#2563EB' : '#D97706'
                        }}>
                          {order.status}
                        </span>
                      </td>
                      <td style={{ padding: '1.5rem' }}>
                        <select
                          className="form-control"
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
                        >
                          <option value="Seller Confirmed">Seller Confirmed</option>
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

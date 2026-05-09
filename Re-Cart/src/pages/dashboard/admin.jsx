// pages/dashboard/admin.js
import DashboardSidebar from '../../components/DashboardSidebar';
import Navbar from '../../components/Navbar';

export default function AdminDashboard() {
  const dummyUsers = [
    { id: 1, name: 'John Doe', role: 'Seller', status: 'Active' },
    { id: 2, name: 'Jane Smith', role: 'Buyer', status: 'Blocked' },
  ];

  const dummyProducts = [
    { id: 1, name: 'iPhone 12', seller: 'John Doe', status: 'Approved' },
    { id: 2, name: 'Dell Laptop', seller: 'Jane Smith', status: 'Pending' },
  ];

  const dummyTransactions = [
    { id: 'TXN001', product: 'iPhone 12', amount: 45000, status: 'Completed' },
    { id: 'TXN002', product: 'Dell Laptop', amount: 30000, status: 'Pending' },
  ];

  const dummyAnalytics = {
    users: 120,
    products: 85,
    orders: 60,
    revenue: 250000,
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="dashboard-layout">
        {/* Sidebar */}
        <DashboardSidebar role="admin" />

        {/* Main Content */}
        <main className="main-content" style={{ padding: '2rem' }}>
          <h1 className="heading-primary">Admin Dashboard</h1>

        {/* Analytics Overview */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className="heading-secondary">Analytics Overview</h2>
          <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <div className="analytics-card" style={{ background: 'var(--bg-white)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
              <p className="text-muted">Users</p>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: '#3B82F6' }}>{dummyAnalytics.users}</p>
            </div>
            <div className="analytics-card" style={{ background: 'var(--bg-white)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
              <p className="text-muted">Products</p>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: '#10B981' }}>{dummyAnalytics.products}</p>
            </div>
            <div className="analytics-card" style={{ background: 'var(--bg-white)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
              <p className="text-muted">Orders</p>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: '#F59E0B' }}>{dummyAnalytics.orders}</p>
            </div>
            <div className="analytics-card" style={{ background: 'var(--bg-white)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
              <p className="text-muted">Revenue</p>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: '#8B5CF6' }}>₹{dummyAnalytics.revenue}</p>
            </div>
          </div>
        </section>

        {/* User Management */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className="heading-secondary">User Management</h2>
          <div className="list-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {dummyUsers.map((user) => (
              <div
                key={user.id}
                className="list-item"
                style={{ background: 'var(--bg-white)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div>
                  <p style={{ fontWeight: 600 }}>{user.name}</p>
                  <p className="text-muted">{user.role}</p>
                </div>
                <span
                  style={{
                    padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.9rem',
                    backgroundColor: user.status === 'Active' ? '#D1FAE5' : '#FEE2E2',
                    color: user.status === 'Active' ? '#059669' : '#DC2626'
                  }}
                >
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Product Moderation */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className="heading-secondary">Product Moderation</h2>
          <div className="list-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {dummyProducts.map((product) => (
              <div
                key={product.id}
                className="list-item"
                style={{ background: 'var(--bg-white)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div>
                  <p style={{ fontWeight: 600 }}>{product.name}</p>
                  <p className="text-muted">Seller: {product.seller}</p>
                </div>
                <span
                  style={{
                    padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.9rem',
                    backgroundColor: product.status === 'Approved' ? '#D1FAE5' : '#FEF3C7',
                    color: product.status === 'Approved' ? '#059669' : '#D97706'
                  }}
                >
                  {product.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Transactions */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className="heading-secondary">Transactions</h2>
          <div className="list-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {dummyTransactions.map((txn) => (
              <div
                key={txn.id}
                className="list-item"
                style={{ background: 'var(--bg-white)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div>
                  <p style={{ fontWeight: 600 }}>{txn.product}</p>
                  <p className="text-muted">Txn ID: {txn.id}</p>
                </div>
                <span
                  style={{
                    padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.9rem',
                    backgroundColor: txn.status === 'Completed' ? '#D1FAE5' : '#FEF3C7',
                    color: txn.status === 'Completed' ? '#059669' : '#D97706'
                  }}
                >
                  {txn.status}
                </span>
                <p style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '1.2rem' }}>₹{txn.amount}</p>
              </div>
            ))}
          </div>
        </section>
        </main>
      </div>
    </div>
  );
}

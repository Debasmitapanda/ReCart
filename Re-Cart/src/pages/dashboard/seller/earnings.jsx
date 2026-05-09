import Navbar from '../../../components/Navbar';
import DashboardSidebar from '../../../components/DashboardSidebar';

export default function Earnings() {
  const earningsData = {
    totalRevenue: 124500,
    pendingClearance: 15000,
    availablePayout: 8500,
    recentTransactions: [
      { id: 'TRX-1092', item: 'Sony PlayStation 5', amount: 45000, status: 'Completed', date: 'Oct 12, 2026' },
      { id: 'TRX-1093', item: 'Dell Laptop', amount: 30000, status: 'Completed', date: 'Oct 10, 2026' },
      { id: 'TRX-1094', item: 'Mechanical Keyboard', amount: 8500, status: 'Available', date: 'Oct 15, 2026' },
      { id: 'TRX-1095', item: 'AirPods Pro', amount: 15000, status: 'Pending', date: 'Oct 18, 2026' },
    ]
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="dashboard-layout">
        <DashboardSidebar role="seller" />
        
        <main className="main-content" style={{ padding: '2rem' }}>
          <h1 className="heading-primary">Your Earnings</h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            {/* Total Revenue Card */}
            <div style={{ background: 'linear-gradient(135deg, var(--primary), #8B5CF6)', color: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 500, opacity: 0.9 }}>Total Revenue</h3>
              <p style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.5rem 0' }}>₹{earningsData.totalRevenue.toLocaleString()}</p>
              <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>Lifetime sales on Re-Cart</span>
            </div>

            {/* Available Payout Card */}
            <div style={{ background: 'linear-gradient(135deg, var(--secondary), #34D399)', color: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 500, opacity: 0.9 }}>Available for Payout</h3>
              <p style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.5rem 0' }}>₹{earningsData.availablePayout.toLocaleString()}</p>
              <button className="btn" style={{ background: 'white', color: 'var(--secondary)', padding: '0.5rem 1rem', fontSize: '0.9rem', marginTop: '0.5rem', fontWeight: 700 }}>
                Withdraw Funds
              </button>
            </div>

            {/* Pending Card */}
            <div style={{ background: 'var(--bg-white)', border: '1px solid var(--border-color)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-muted)' }}>Pending Clearance</h3>
              <p style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.5rem 0', color: 'var(--text-main)' }}>₹{earningsData.pendingClearance.toLocaleString()}</p>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Clears in 3-5 business days</span>
            </div>
          </div>

          <h2 className="heading-secondary" style={{ marginBottom: '1.5rem' }}>Recent Transactions</h2>
          <div style={{ background: 'var(--bg-white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-light)', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '1rem 1.5rem' }}>Transaction ID</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Item Sold</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Date</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Amount</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {earningsData.recentTransactions.map((trx, index) => (
                  <tr key={trx.id} style={{ borderBottom: index !== earningsData.recentTransactions.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                    <td style={{ padding: '1.5rem', fontWeight: 500 }}>{trx.id}</td>
                    <td style={{ padding: '1.5rem' }}>{trx.item}</td>
                    <td style={{ padding: '1.5rem', color: 'var(--text-muted)' }}>{trx.date}</td>
                    <td style={{ padding: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>₹{trx.amount.toLocaleString()}</td>
                    <td style={{ padding: '1.5rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        backgroundColor: trx.status === 'Completed' ? 'rgba(79, 70, 229, 0.1)' : trx.status === 'Available' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                        color: trx.status === 'Completed' ? 'var(--primary)' : trx.status === 'Available' ? 'var(--secondary)' : '#D97706'
                      }}>
                        {trx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

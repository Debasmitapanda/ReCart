// pages/dashboard/agent.js
import DashboardSidebar from '../../components/DashboardSidebar';
import DashboardNotifications from '../../components/DashboardNotifications';
import Navbar from '../../components/Navbar';

export default function AgentDashboard() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
        <DashboardSidebar role="agent" />
        <main className="main-content" style={{ flex: 1, padding: '2rem' }}>
          <h1 className="heading-primary">Delivery Agent Dashboard</h1>
          <DashboardNotifications />
        </main>
      </div>
    </div>
  );
}

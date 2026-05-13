// pages/dashboard/agent.js
import DashboardSidebar from '../../components/DashboardSidebar';
import DashboardNotifications from '../../components/DashboardNotifications';
import Navbar from '../../components/Navbar';
import { useState } from 'react';

export default function AgentDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
          <h1 className="heading-primary">Delivery Agent Dashboard</h1>
          <DashboardNotifications />
        </main>
      </div>
    </div>
  );
}

// pages/dashboard/buyer.js
import DashboardSidebar from '../../components/DashboardSidebar';
import DashboardNotifications from '../../components/DashboardNotifications';
import Navbar from '../../components/Navbar';
import UserProfile from '../../components/UserProfile';
import { useState } from 'react';

export default function BuyerDashboard() {
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
          <DashboardSidebar role="buyer" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>
        <main className="main-content" style={{ padding: '2rem', flex: 1, width: '100%' }}>
          <h1 className="heading-primary">Buyer Dashboard</h1>
          <UserProfile role="buyer" />
          <DashboardNotifications />
          {/* Add buyer-specific sections: Orders, Wishlist, Cart */}
        </main>
      </div>
    </div>
  );
}

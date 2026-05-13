// pages/dashboard/seller.js
import DashboardSidebar from '../../components/DashboardSidebar';
import DashboardNotifications from '../../components/DashboardNotifications';
import Navbar from '../../components/Navbar';
import UserProfile from '../../components/UserProfile';
import { useState } from 'react';

export default function SellerDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="dashboard-layout">
        {/* Sidebar Toggle Button for Mobile */}
        <button 
          className="sidebar-toggle-mobile"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{ display: 'none' }}
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? '✕' : '☰'}
        </button>

        <div style={{ position: 'relative' }}>
          <DashboardSidebar role="seller" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>

        <main className="main-content" style={{ padding: '2rem', flex: 1, width: '100%' }}>
          <h1 className="heading-primary">Seller Dashboard</h1>
          <UserProfile role="seller" />
          <DashboardNotifications />
          {/* Add seller-specific sections: Product management, Orders */}
        </main>
      </div>
    </div>
  );
}

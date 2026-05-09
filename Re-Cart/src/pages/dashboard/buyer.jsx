// pages/dashboard/buyer.js
import DashboardSidebar from '../../components/DashboardSidebar';
import DashboardNotifications from '../../components/DashboardNotifications';
import Navbar from '../../components/Navbar';
import UserProfile from '../../components/UserProfile';

export default function BuyerDashboard() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="dashboard-layout">
        <DashboardSidebar role="buyer" />
        <main className="main-content" style={{ padding: '2rem' }}>
          <h1 className="heading-primary">Buyer Dashboard</h1>
          <UserProfile role="buyer" />
          <DashboardNotifications />
          {/* Add buyer-specific sections: Orders, Wishlist, Cart */}
        </main>
      </div>
    </div>
  );
}

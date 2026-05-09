// pages/dashboard/seller.js
import DashboardSidebar from '../../components/DashboardSidebar';
import DashboardNotifications from '../../components/DashboardNotifications';
import Navbar from '../../components/Navbar';
import UserProfile from '../../components/UserProfile';

export default function SellerDashboard() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
        <DashboardSidebar role="seller" />
        <main className="main-content" style={{ flex: 1, padding: '2rem' }}>
          <h1 className="heading-primary">Seller Dashboard</h1>
          <UserProfile role="seller" />
          <DashboardNotifications />
          {/* Add seller-specific sections: Product management, Orders */}
        </main>
      </div>
    </div>
  );
}

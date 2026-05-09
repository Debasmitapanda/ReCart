// components/DashboardSidebar.js
import { Link } from 'react-router-dom';

export default function DashboardSidebar({ role }) {
  const links = {
    buyer: [
      { name: 'Dashboard', href: '/dashboard/buyer' },
      { name: 'Browse Products', href: '/products' },
      { name: 'Wishlist', href: '/wishlist' },
      { name: 'Orders', href: '/orders' },
      { name: 'Cart', href: '/cart' },
    ],
    seller: [
      { name: 'Dashboard', href: '/dashboard/seller' },
      { name: 'Add Product', href: '/products/add' },
      { name: 'My Products', href: '/dashboard/seller/products' },
      { name: 'Earnings', href: '/dashboard/seller/earnings' },
      { name: 'Notifications', href: '/dashboard/seller' },
    ],
    agent: [
      { name: 'Dashboard', href: '/dashboard/agent' },
      { name: 'Assigned Deliveries', href: '/dashboard/agent/deliveries' },
      { name: 'Update Status', href: '/dashboard/agent/update-status' },
    ],
    admin: [
      { name: 'Dashboard', href: '/dashboard/admin' },
      { name: 'User Management', href: '/dashboard/admin' },
      { name: 'Product Moderation', href: '/dashboard/admin' },
      { name: 'Transactions', href: '/dashboard/admin' },
      { name: 'Analytics', href: '/dashboard/admin' },
    ],
  };

  return (
    <aside className="dashboard-sidebar" style={{ width: '250px', background: 'var(--bg-white)', padding: '1.5rem', borderRight: '1px solid var(--border-color)', height: 'calc(100vh - 73px)', position: 'sticky', top: '73px' }}>
      <h2 className="heading-secondary" style={{ textTransform: 'capitalize', marginBottom: '1.5rem', fontSize: '1.25rem' }}>{role} Panel</h2>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {links[role]?.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className="nav-link"
            style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', display: 'block' }}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}


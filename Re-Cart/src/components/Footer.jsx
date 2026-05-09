// components/Footer.js
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Branding */}
        <div>
          <h2 className="heading-secondary">Re-Cart</h2>
          <p className="text-muted">
            Buy and sell used items securely with real-time tracking and payments.
          </p>
        </div>


        {/* Social Media */}
        <div style={{ textAlign: 'center' }}>
          <h3 className="heading-secondary">Follow Us</h3>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <a href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#94A3B8' }} className="hover:text-white transition-colors">
              <span style={{ fontSize: '1.5rem' }}>📸</span>
              <span style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Instagram</span>
            </a>
            <a href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#94A3B8' }} className="hover:text-white transition-colors">
              <span style={{ fontSize: '1.5rem' }}>💬</span>
              <span style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>WhatsApp</span>
            </a>
            <a href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#94A3B8' }} className="hover:text-white transition-colors">
              <span style={{ fontSize: '1.5rem' }}>🐦</span>
              <span style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Twitter</span>
            </a>
            <a href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#94A3B8' }} className="hover:text-white transition-colors">
              <span style={{ fontSize: '1.5rem' }}>✉️</span>
              <span style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Email</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ textAlign: 'center', paddingTop: '2rem', marginTop: '1rem', borderTop: '1px solid #334155', color: '#64748B', fontSize: '0.85rem' }}>
        © {new Date().getFullYear()} Re-Cart. All rights reserved.
      </div>
    </footer>
  );
}

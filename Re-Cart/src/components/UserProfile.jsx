import { useState, useEffect } from 'react';
import axios from '../api/axios.js';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';

export default function UserProfile({ role }) {
  const { user: authUser, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Use real user data from AuthContext
  const [user, setUser] = useState({
    name: authUser?.name || 'Loading...',
    email: authUser?.email || 'loading...',
    role: authUser?.role || role || 'buyer',
    joinDate: 'Today',
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser?.name || 'User')}&background=4F46E5&color=fff&size=128`
  });

  useEffect(() => {
    if (authUser) {
      setUser({
        name: authUser.name,
        email: authUser.email,
        role: authUser.role,
        joinDate: 'Today',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser.name)}&background=4F46E5&color=fff&size=128`
      });
      setEditForm({
        name: authUser.name,
        email: authUser.email
      });
    }
  }, [authUser]);
  const { refreshOrders } = useOrders();
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email
  });

  const handleSave = async () => {
    try {
      const { data } = await axios.put('/api/users/profile',
        { name: editForm.name, email: editForm.email },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      // Update global AuthContext state so changes persist locally during session
      login(data, localStorage.getItem('token'));

      // Refresh orders to reflect updated name
      if (typeof refreshOrders === 'function') refreshOrders();

      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.response?.data?.message || 'Failed to update profile');
    }
  };


  return (
    <div style={{
      background: 'var(--bg-dashboard-box)',
      padding: '2rem',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-md)',
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
      marginBottom: '2rem',
      border: '1px solid var(--border-color)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <img 
        src={user.avatar} 
        alt="Profile" 
        style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', boxShadow: 'var(--shadow-md)' }}
      />
      
      <div style={{ flex: 1 }}>
        {isEditing ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem', maxWidth: '300px' }}>
            <input 
              type="text" 
              value={editForm.name} 
              onChange={(e) => setEditForm({...editForm, name: e.target.value})}
              style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
            />
            <input 
              type="email" 
              value={editForm.email} 
              onChange={(e) => setEditForm({...editForm, email: e.target.value})}
              style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
            />
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 0.25rem 0' }}>{user.name}</h2>
            <p style={{ color: 'var(--text-muted)', margin: '0 0 1rem 0' }}>{user.email}</p>
          </>
        )}
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ 
            background: user.role === 'seller' ? 'linear-gradient(135deg, var(--secondary), #34D399)' : 'linear-gradient(135deg, var(--primary), #8B5CF6)', 
            color: 'white', 
            padding: '0.25rem 1rem', 
            borderRadius: 'var(--radius-full)', 
            fontSize: '0.85rem', 
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {user.role}
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
            Member since {user.joinDate}
          </span>
        </div>
      </div>
      
      {isEditing ? (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="btn btn-secondary" 
            onClick={() => {
              setIsEditing(false);
              setEditForm({ name: user.name, email: user.email }); // Reset form
            }}
            style={{ background: 'var(--bg-light)', color: 'var(--text-main)', border: '1px solid var(--border-color)', boxShadow: 'none' }}
          >
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      ) : (
        <button 
          className="btn btn-primary" 
          onClick={() => setIsEditing(true)}
          style={{ background: 'var(--bg-light)', color: 'var(--text-main)', border: '1px solid var(--border-color)', boxShadow: 'none' }}
        >
          Edit Profile
        </button>
      )}
    </div>
  );
}

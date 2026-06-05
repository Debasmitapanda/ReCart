import { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/axios';

const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return;
      
      // Fetch buyer, seller, and agent orders and merge
      const [buyerRes, sellerRes, agentRes] = await Promise.all([
        apiClient.get('/api/orders/buyer').catch(() => ({ data: [] })),
        apiClient.get('/api/orders/seller').catch(() => ({ data: [] })),
        apiClient.get('/api/orders/agent').catch(() => ({ data: [] }))
      ]);
      
      const allOrders = [...buyerRes.data, ...sellerRes.data, ...agentRes.data];
      // Deduplicate by ID
      const uniqueOrdersMap = new Map();
      allOrders.forEach(o => uniqueOrdersMap.set(o._id, o));
      let uniqueOrders = Array.from(uniqueOrdersMap.values());
      
      // Sort by latest ordered at top
      uniqueOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      const formatted = uniqueOrders.map(o => ({
        _id: o._id,
        id: o._id,
        product: o.product || { name: 'Unknown Product' },
        status: o.status || 'Pending',
        paymentStatus: o.paymentStatus || 'Pending',
        date: new Date(o.createdAt).toISOString().split('T')[0],
        amount: o.amount || 0,
        customer: o.buyer?.name || 'Unknown',
        address: o.deliveryAddress || 'N/A',
        contact: o.buyer?.email || 'N/A',
        sellerId: o.seller?._id || o.seller
      }));
      
      setOrders(formatted);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchOrders();
    }
  }, []);

  const refreshOrders = () => {
    fetchOrders();
  };

  const addOrder = async (orderPayload) => {
    try {
      const res = await apiClient.post('/api/orders', orderPayload);
      const o = res.data;
      
      const newFormattedOrder = {
          _id: o._id,
          id: o._id,
          product: o.product || { name: 'Unknown Product' },
          status: o.status || 'Pending',
          paymentStatus: o.paymentStatus || 'Pending',
          date: new Date(o.createdAt).toISOString().split('T')[0],
          amount: o.amount || 0,
          customer: o.buyer?.name || 'Unknown',
          address: o.deliveryAddress || 'N/A',
          contact: o.buyer?.email || 'N/A'
      };
      
      setOrders(prev => [newFormattedOrder, ...prev]);
      return o;
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  };

  const updateOrderStatus = async (id, newStatus) => {
    try {
      await apiClient.put(`/api/orders/${id}/status`, { status: newStatus });
      setOrders(prev => prev.map(order => 
        (order.id === id || order._id === id) ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus, refreshOrders }}>
      {children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => useContext(OrdersContext);

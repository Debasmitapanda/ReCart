import { createContext, useContext, useState, useEffect } from 'react';

const OrdersContext = createContext();

const initialDummyOrders = [
  {
    id: 'ORD001',
    product: 'iPhone 12',
    status: 'Out for Delivery',
    date: '2026-05-01',
    amount: 45000,
    customer: 'John Doe',
    address: '123 Tech Park, Bengaluru',
    contact: '+91 9876543210'
  },
  {
    id: 'ORD002',
    product: 'Dell Laptop',
    status: 'Delivered',
    date: '2026-04-28',
    amount: 30000,
    customer: 'Alice Smith',
    address: '456 MG Road, Mumbai',
    contact: '+91 8765432109'
  },
  {
    id: 'ORD003',
    product: 'Motorbike',
    status: 'Seller Confirmed',
    date: '2026-05-02',
    amount: 60000,
    customer: 'Bob Johnson',
    address: '789 Link Road, Delhi',
    contact: '+91 7654321098'
  },
];

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : initialDummyOrders;
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order) => {
    setOrders(prev => [order, ...prev]);
  };

  const updateOrderStatus = (id, newStatus) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => useContext(OrdersContext);

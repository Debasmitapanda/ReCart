import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/index.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';
import Cart from './pages/cart.jsx';
import Wishlist from './pages/wishlist.jsx';
import Checkout from './pages/checkout.jsx';
import Products from './pages/products.jsx';
import Orders from './pages/orders.jsx';
import OrderTracking from './pages/orders/[id].jsx';
import PaymentPage from './pages/payment/[orderId].jsx';
import ProductDetail from './pages/products/[id].jsx';
import AddProduct from './pages/products/add.jsx';
import EditProduct from './pages/products/edit.jsx';
import AdminDashboard from './pages/dashboard/admin.jsx';
import AgentDashboard from './pages/dashboard/agent.jsx';
import AssignedDeliveries from './pages/dashboard/agent/deliveries.jsx';
import UpdateStatus from './pages/dashboard/agent/update-status.jsx';
import BuyerDashboard from './pages/dashboard/buyer.jsx';
import SellerDashboard from './pages/dashboard/seller.jsx';
import Earnings from './pages/dashboard/seller/earnings.jsx';
import MyProducts from './pages/dashboard/seller/products.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProductsProvider } from './context/ProductsContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { OrdersProvider } from './context/OrdersContext.jsx';

function App() {
  return (
    <AuthProvider>
      <OrdersProvider>
        <ProductsProvider>
          <WishlistProvider>
            <CartProvider>

          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/products" element={<Products />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:id" element={<OrderTracking />} />
              <Route path="/payment/:orderId" element={<PaymentPage />} />
              <Route path="/products/add" element={<AddProduct />} />
              <Route path="/products/edit/:id" element={<EditProduct />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
              <Route path="/dashboard/agent" element={<AgentDashboard />} />
              <Route path="/dashboard/agent/deliveries" element={<AssignedDeliveries />} />
              <Route path="/dashboard/agent/update-status" element={<UpdateStatus />} />
              <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
              <Route path="/dashboard/seller" element={<SellerDashboard />} />
              <Route path="/dashboard/seller/earnings" element={<Earnings />} />
              <Route path="/dashboard/seller/products" element={<MyProducts />} />
            </Routes>
          </Router>
          </CartProvider>
        </WishlistProvider>
      </ProductsProvider>
      </OrdersProvider>
    </AuthProvider>
  );
}

export default App;

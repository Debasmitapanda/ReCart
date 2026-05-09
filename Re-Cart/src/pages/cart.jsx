// pages/cart.js
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductsContext';

export default function Cart() {
  const { cartItems, updateQty, removeItem } = useCart();
  const { products } = useProducts();

  // Filter out any ghost items that were deleted from the catalog
  const validCartItems = cartItems.filter(item => 
    products.some(p => {
      const pid = p.id || p._id;
      const iid = item.id || item._id;
      return pid && iid && pid.toString() === iid.toString();
    })
  );

  const total = validCartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="cart-container main-content">
        <h1 className="heading-primary">Your Cart</h1>
        {validCartItems.length === 0 ? (
          <p className="text-muted">Your cart is empty.</p>
        ) : (
          <div className="cart-list">
            {validCartItems.map(item => (
              <div
                key={item.id}
                className="cart-item"
              >
                <img
                  src={item.images ? item.images[0] : item.image}
                  alt={item.name}
                />
                <div className="cart-details">
                  <h2 className="product-title">{item.name}</h2>
                  <p className="product-price">₹{item.price}</p>
                  <input
                    type="number"
                    value={item.qty}
                    min="1"
                    onChange={(e) => updateQty(item.id || item._id, parseInt(e.target.value))}
                    style={{ width: '80px', marginTop: '0.5rem' }}
                  />
                </div>
                <button
                  onClick={() => removeItem(item.id || item._id)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="cart-summary">
              <p className="heading-secondary" style={{ marginBottom: '1rem' }}>Total: ₹{total}</p>
              <Link
                to="/checkout"
                className="btn btn-primary"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

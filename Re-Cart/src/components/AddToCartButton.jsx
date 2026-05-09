import axios from 'axios';

export default function AddToCartButton({ productId }) {
  const handleCart = async () => {
    await axios.post('/api/cart', { productId, quantity: 1 }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    alert('Added to cart!');
  };

  return (
    <button onClick={handleCart} className="bg-green-600 text-white px-3 py-1 rounded">
      🛒 Add to Cart
    </button>
  );
}

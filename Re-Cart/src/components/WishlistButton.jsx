import axios from 'axios';

export default function WishlistButton({ productId }) {
  const handleWishlist = async () => {
    await axios.post('/api/wishlist', { productId }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    alert('Added to wishlist!');
  };

  return (
    <button onClick={handleWishlist} className="bg-pink-600 text-white px-3 py-1 rounded">
      ♥ Wishlist
    </button>
  );
}

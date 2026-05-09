// components/ProductReviews.js
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await axios.get(`/api/reviews/product/${productId}`);
      setReviews(data);
    };
    fetchReviews();
  }, [productId]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mt-6">
      <h2 className="text-lg font-bold mb-3">Customer Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet</p>
      ) : (
        <ul className="space-y-3">
          {reviews.map((rev) => (
            <li key={rev._id} className="border-b pb-2">
              <p className="font-semibold">{rev.buyer.name}</p>
              <p>⭐ {rev.rating}/5</p>
              <p className="text-gray-600">{rev.comment}</p>
              <span className="text-xs text-gray-400">
                {new Date(rev.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

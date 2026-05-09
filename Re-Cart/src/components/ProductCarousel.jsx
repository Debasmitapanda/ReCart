// components/ProductCarousel.js
import { useState } from 'react';

export default function ProductCarousel({ images: initialImages }) {
  const images = (!initialImages || initialImages.length === 0) 
    ? ['https://via.placeholder.com/800x400?text=No+Image'] 
    : initialImages;
  
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="product-carousel" style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      {/* Image */}
      <img
        src={images[current]}
        alt={`Product image ${current + 1}`}
        className="carousel-image"
        style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}
      />

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        style={{ position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}
      >
        ›
      </button>

      {/* Dots */}
      <div className="carousel-dots" style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', gap: '0.5rem' }}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            style={{ width: '12px', height: '12px', borderRadius: '50%', padding: 0, background: current === index ? 'var(--primary)' : 'var(--text-muted)' }}
          ></button>
        ))}
      </div>
    </div>
  );
}

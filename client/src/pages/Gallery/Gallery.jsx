// src/components/Gallery/Gallery.jsx
import React from 'react';
import './Gallery.css'; // Import the CSS
import '../components/PageLayout.css';

const Gallery = ({ images }) => {
  return (
    <div className="gallery-grid">
      {images.map((image) => (
        <div key={image.id} className="image-card">
          <img src={image.url} alt={image.title} />
          <div className="image-card-content">
            <h3>{image.title}</h3>
            <p>{image.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
import React from 'react';
import './CarCard.css';

const CarCard = ({ car }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    
    return stars;
  };

  return (
    <div className={`car-card ${!car.available ? 'unavailable' : ''}`}>
      <div className="car-image-container">
        <img 
          src={car.image} 
          alt={car.name}
          className="car-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x250/cccccc/666666?text=Car+Image';
          }}
        />
        {!car.available && <div className="unavailable-overlay">Not Available</div>}
      </div>
      
      <div className="car-info">
        <div className="car-header">
          <h3 className="car-name">{car.name}</h3>
          <span className="car-type">{car.type}</span>
        </div>
        
        <div className="car-brand">{car.brand}</div>
        
        <div className="car-rating">
          <div className="stars">{renderStars(car.rating)}</div>
          <span className="rating-value">({car.rating})</span>
        </div>
        
        <div className="car-features">
          {car.features.map((feature, index) => (
            <span key={index} className="feature-tag">{feature}</span>
          ))}
        </div>
        
        <div className="car-footer">
          <div className="car-price">{car.price}</div>
          <button 
            className={`rent-btn ${!car.available ? 'disabled' : ''}`}
            disabled={!car.available}
          >
            {car.available ? 'Rent Now' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;

import React, { useState } from 'react';
import './AddCarForm.css';

const AddCarForm = ({ onAddCar, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    type: 'SUV',
    price: '',
    image: '',
    features: '',
    rating: 4.0
  });

  const [errors, setErrors] = useState({});

  const carTypes = ['SUV', 'Hatchback', 'Sedan', 'Convertible', 'Coupe'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Car name is required';
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (!formData.features.trim()) newErrors.features = 'Features are required';
    
    // Validate image URL format
    if (formData.image && !isValidUrl(formData.image)) {
      newErrors.image = 'Please enter a valid image URL';
    }
    
    // Validate price format
    if (formData.price && !formData.price.includes('₹') && !formData.price.includes('/day')) {
      newErrors.price = 'Price should be in format "₹2,500/day"';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const newCar = {
      id: Date.now(), // Simple ID generation
      name: formData.name.trim(),
      brand: formData.brand.trim(),
      type: formData.type,
      price: formData.price.trim(),
      image: formData.image.trim(),
      features: formData.features.split(',').map(f => f.trim()).filter(f => f),
      rating: parseFloat(formData.rating),
      available: true
    };
    
    onAddCar(newCar);
    
    // Reset form
    setFormData({
      name: '',
      brand: '',
      type: 'SUV',
      price: '',
      image: '',
      features: '',
      rating: 4.0
    });
  };

  return (
    <div className="add-car-overlay">
      <div className="add-car-form">
        <div className="form-header">
          <h3>Add New Car</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Car Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Hyundai Creta"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Brand *</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="e.g., Hyundai"
              className={errors.brand ? 'error' : ''}
            />
            {errors.brand && <span className="error-text">{errors.brand}</span>}
          </div>

          <div className="form-group">
            <label>Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              {carTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Price per Day *</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., ₹2,500/day"
              className={errors.price ? 'error' : ''}
            />
            {errors.price && <span className="error-text">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label>Image URL *</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/car-image.jpg"
              className={errors.image ? 'error' : ''}
            />
            {errors.image && <span className="error-text">{errors.image}</span>}
            {formData.image && isValidUrl(formData.image) && (
              <div className="image-preview">
                <img src={formData.image} alt="Preview" onError={(e) => {
                  e.target.style.display = 'none';
                }} />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Features * (comma separated)</label>
            <input
              type="text"
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="e.g., 5 Seater, Automatic, Petrol, AC"
              className={errors.features ? 'error' : ''}
            />
            {errors.features && <span className="error-text">{errors.features}</span>}
          </div>

          <div className="form-group">
            <label>Rating (1-5)</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="1"
              max="5"
              step="0.1"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarForm;

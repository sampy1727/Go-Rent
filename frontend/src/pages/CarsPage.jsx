import React, { useState } from 'react';
import CarCard from '../components/CarCard';
import AddCarForm from '../components/AddCarForm';
import { carsData } from '../data/carsData';
import './CarsPage.css';

const CarsPage = () => {
  const [cars, setCars] = useState(carsData);
  const [filterType, setFilterType] = useState('All');
  const [filterAvailability, setFilterAvailability] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);

  const carTypes = ['All', ...new Set(cars.map(car => car.type))];
  
  const filteredCars = cars.filter(car => {
    const typeMatch = filterType === 'All' || car.type === filterType;
    const availabilityMatch = filterAvailability === 'All' || 
      (filterAvailability === 'Available' && car.available) ||
      (filterAvailability === 'Unavailable' && !car.available);
    
    return typeMatch && availabilityMatch;
  });

  const handleAddCar = (newCar) => {
    setCars(prev => [...prev, newCar]);
    setShowAddForm(false);
  };

  return (
    <div className="cars-page">
      <div className="cars-header">
        <div className="header-content">
          <div>
            <h2>Our Car Fleet</h2>
            <p>Choose from our wide selection of premium rental cars</p>
          </div>
          <button 
            className="add-car-btn"
            onClick={() => setShowAddForm(true)}
          >
            + Add New Car
          </button>
        </div>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Filter by Type:</label>
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            {carTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Filter by Availability:</label>
          <select 
            value={filterAvailability} 
            onChange={(e) => setFilterAvailability(e.target.value)}
            className="filter-select"
          >
            <option value="All">All</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
      </div>

      <div className="cars-grid">
        {filteredCars.length > 0 ? (
          filteredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))
        ) : (
          <div className="no-cars">
            <p>No cars match your current filters.</p>
          </div>
        )}
      </div>

      <div className="cars-count">
        Showing {filteredCars.length} of {cars.length} cars
      </div>

      {showAddForm && (
        <AddCarForm 
          onAddCar={handleAddCar}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default CarsPage;

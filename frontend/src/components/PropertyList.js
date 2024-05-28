import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles.css';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Simulating an API call with hardcoded data
    const fetchProperties = async () => {
      const response = [
        { _id: '1', title: 'Modern Family Home', price: 350000, location: 'Los Angeles, CA', imageUrl: 'https://via.placeholder.com/400x300' },
        { _id: '2', title: 'Luxury Villa', price: 1200000, location: 'Beverly Hills, CA', imageUrl: 'https://via.placeholder.com/400x300' },
        { _id: '3', title: 'Cozy Cottage', price: 250000, location: 'Austin, TX', imageUrl: 'https://via.placeholder.com/400x300' },
        { _id: '4', title: 'Downtown Apartment', price: 450000, location: 'New York, NY', imageUrl: 'https://via.placeholder.com/400x300' },
        { _id: '5', title: 'Suburban House', price: 300000, location: 'Seattle, WA', imageUrl: 'https://via.placeholder.com/400x300' },
        { _id: '6', title: 'Beachfront Property', price: 800000, location: 'Miami, FL', imageUrl: 'https://via.placeholder.com/400x300' },
        { _id: '7', title: 'Mountain Retreat', price: 500000, location: 'Denver, CO', imageUrl: 'https://via.placeholder.com/400x300' },
        { _id: '8', title: 'Country Estate', price: 750000, location: 'Nashville, TN', imageUrl: 'https://via.placeholder.com/400x300' },
        { _id: '9', title: 'Urban Loft', price: 400000, location: 'San Francisco, CA', imageUrl: 'https://via.placeholder.com/400x300' },
        { _id: '10', title: 'Historic Mansion', price: 1500000, location: 'Savannah, GA', imageUrl: 'https://via.placeholder.com/400x300' },
        { _id: '11', title: 'Eco-friendly Home', price: 600000, location: 'Portland, OR', imageUrl: 'https://via.placeholder.com/400x300' },
        { _id: '12', title: 'Penthouse Suite', price: 2000000, location: 'Chicago, IL', imageUrl: 'https://via.placeholder.com/400x300' },
        { _id: '13', title: 'Modern Townhouse', price: 500000, location: 'San Diego, CA', imageUrl: 'https://via.placeholder.com/400x300' },
        { _id: '14', title: 'Luxury Condo', price: 700000, location: 'Las Vegas, NV', imageUrl: 'https://via.placeholder.com/400x300' },
        { _id: '15', title: 'Riverside Cottage', price: 450000, location: 'Sacramento, CA', imageUrl: 'https://via.placeholder.com/400x300' },
        { _id: '16', title: 'Studio Apartment', price: 200000, location: 'Boston, MA', imageUrl: 'https://via.placeholder.com/400x300' }
      ];
      setProperties(response);
    };
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(search.toLowerCase()) ||
    property.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="property-list container">
      <h2 className="text-center my-5">Available Properties</h2>
      <div className="search-bar-container mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="row">
        {filteredProperties.map((property) => (
          <div key={property._id} className="col-md-4 mb-4">
            <div className="property-item card">
              <img src={property.imageUrl} className="card-img-top" alt={property.title} />
              <div className="card-body">
                <h5 className="card-title">{property.title}</h5>
                <p className="card-text">${property.price.toLocaleString()}</p>
                <p className="card-text">{property.location}</p>
                <Link to={`/properties/${property._id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;




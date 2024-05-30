import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles.css';

const MyProperties = ({ user }) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      if (user && user._id) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:5000/properties/user/${user._id}`, {
            headers: {
              'x-auth-token': token,
            },
          });
          setProperties(response.data);
        } catch (error) {
          console.error('Error fetching properties:', error);
        }
      }
    };

    fetchProperties();
  }, [user]);

  const handleDelete = async (propertyId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/properties/${propertyId}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setProperties(properties.filter(property => property._id !== propertyId));
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  return (
    <div className="my-properties-container">
      <h2>My Properties</h2>
      {properties.length > 0 ? (
        <div className="property-list">
          {properties.map((property) => (
            <div key={property._id} className="property-card">
              <img src={property.imageUrls[0]} alt={property.title} className="property-image" /> {/* Access first image URL */}
              <div className="property-card-content">
                <h3>{property.title}</h3>
                <p>{property.description}</p>
                <p className="property-price">${property.price.toLocaleString()}</p>
                <p>{property.location}</p>
                <Link to={`/my-properties/${property._id}`} className="btn btn-primary">View Details</Link>
                <button onClick={() => handleDelete(property._id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No properties found.</p>
      )}
    </div>
  );
};

export default MyProperties;



























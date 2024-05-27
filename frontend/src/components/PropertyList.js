import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles.css';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await axios.get('http://localhost:5000/properties');
      setProperties(response.data);
    };
    fetchProperties();
  }, []);

  return (
    <div className="property-list">
      {properties.map((property) => (
        <div key={property._id} className="property-item">
          <img src={property.imageUrl} alt={property.title} />
          <h2>{property.title}</h2>
          <p>{property.price}</p>
          <Link to={`/properties/${property._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;

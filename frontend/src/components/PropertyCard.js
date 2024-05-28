import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      <img src={property.image} className="property-image" alt={property.title} />
      <div className="property-card-content">
        <h2>{property.title}</h2>
        <p className="property-price">${property.price.toLocaleString()}</p>
        <p className="property-location">{property.location}</p>
        <Link to={`/properties/${property._id}`} className="property-details-link">View Details</Link>
      </div>
    </div>
  );
};

export default PropertyCard;









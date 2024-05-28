import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      // Simulating an API call
      const properties = [
        { _id: '1', title: 'Modern Family Home', price: 350000, location: 'Los Angeles, CA', image: 'https://via.placeholder.com/400x300', description: 'A beautiful modern family home in Los Angeles.' },
        { _id: '2', title: 'Luxury Villa', price: 1200000, location: 'Beverly Hills, CA', image: 'https://via.placeholder.com/400x300', description: 'A luxurious villa in Beverly Hills.' },
        // Add more properties here as needed
      ];
      const property = properties.find((prop) => prop._id === id);
      setProperty(property);
    };
    fetchProperty();
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <div className="property-details">
      <img src={property.image} alt={property.title} />
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <p>{property.location}</p>
      <p className="property-price">${property.price.toLocaleString()}</p>
    </div>
  );
};

export default PropertyDetails;



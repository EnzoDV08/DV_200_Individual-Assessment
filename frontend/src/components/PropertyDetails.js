import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      const response = await axios.get(`http://localhost:5000/properties/${id}`);
      setProperty(response.data);
    };
    fetchProperty();
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <div className="property-details">
      <img src={property.imageUrl} alt={property.title} />
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <p>{property.location}</p>
      <p>${property.price}</p>
    </div>
  );
};

export default PropertyDetails;


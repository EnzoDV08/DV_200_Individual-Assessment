import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles.css';

const UserPropertyDetails = ({ user }) => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/properties/${id}`, {
          headers: {
            'x-auth-token': token,
          },
        });
        setProperty(response.data);
      } catch (err) {
        setError('Error fetching property details');
        console.error(err);
      }
    };

    fetchProperty();
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/properties/${id}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      navigate('/my-properties');
    } catch (err) {
      setError('Error deleting property');
      console.error(err);
    }
  };

  if (!property) return <p>Loading...</p>;

  return (
    <div className="property-details">
      <FaArrowLeft onClick={() => navigate(-1)} className="back-arrow" />
      <Carousel>
        {property.imageUrls &&
          property.imageUrls.map((url, index) => (
            <Carousel.Item key={index}>
              <img className="d-block w-100" src={url} alt={`Slide ${index}`} />
            </Carousel.Item>
          ))}
      </Carousel>
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <p>{property.location}</p>
      <p className="property-price">${property.price.toLocaleString()}</p>

      {property.agent && (
        <div className="agent-details">
          <h3>Contact Agent</h3>
          <p>Name: {property.agent.name}</p>
          <p>Phone: {property.agent.phone}</p>
          <p>Email: {property.agent.email}</p>
        </div>
      )}

      {user && user._id === property.createdBy && (
        <button onClick={handleDelete} className="btn btn-danger mt-2">
          Delete Property
        </button>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default UserPropertyDetails;

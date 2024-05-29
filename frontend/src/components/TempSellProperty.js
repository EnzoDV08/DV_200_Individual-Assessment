import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const SellProperty = ({ user }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [agentName, setAgentName] = useState('');
  const [agentPhone, setAgentPhone] = useState('');
  const [agentEmail, setAgentEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/properties',
        {
          title,
          description,
          price,
          location,
          imageUrl,
          createdBy: user._id,
          agent: {
            name: agentName,
            phone: agentPhone,
            email: agentEmail,
          },
        },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      navigate('/my-properties');
    } catch (err) {
      setError('There was an error creating the property!');
      console.error('There was an error creating the property!', err);
    }
  };

  return (
    <div className="sell-property-container">
      <h2>Sell Property</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="sell-property-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="agentName">Agent Name</label>
          <input
            type="text"
            id="agentName"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="agentPhone">Agent Phone</label>
          <input
            type="text"
            id="agentPhone"
            value={agentPhone}
            onChange={(e) => setAgentPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="agentEmail">Agent Email</label>
          <input
            type="email"
            id="agentEmail"
            value={agentEmail}
            onChange={(e) => setAgentEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Property</button>
      </form>
    </div>
  );
};

export default SellProperty;







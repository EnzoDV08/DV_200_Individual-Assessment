import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from './PropertyCard';
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles.css';

const Home = ({ user, setUser }) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await axios.get('http://localhost:5000/properties');
      setProperties(response.data);
    };
    fetchProperties();
  }, []);

  return (
    <div className="home-container">
      <NavBar user={user} setUser={setUser} />
      <div className="hero-section">
        <h1>Find Your Dream Home</h1>
        <p>Explore the best properties in your area</p>
      </div>
      <div className="properties-container">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;







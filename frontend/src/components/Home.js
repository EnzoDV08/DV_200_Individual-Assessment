import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from './PropertyCard';
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles.css';

const Home = ({ user, setUser }) => {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await axios.get('http://localhost:5000/properties');
      setProperties(response.data);
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    setFilteredProperties(
      properties.filter(property =>
        property.title.toLowerCase().includes(search.toLowerCase()) ||
        property.location.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, properties]);

  return (
    <div className="home-container">
      <NavBar user={user} setUser={setUser} />
      <div className="hero-section">
        <h1>Find Your Dream Home</h1>
        <p>Explore the best properties in your area</p>
        <input
          type="text"
          className="search-bar"
          placeholder="Search properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="featured-section">
        <h2>Featured Properties</h2>
        <div className="properties-container">
          {filteredProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;










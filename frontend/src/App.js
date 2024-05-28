import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import PropertyDetails from './components/PropertyDetails';
import PropertyList from './components/PropertyList';
import NavBar from './components/NavBar';
import SellProperty from './components/SellProperty';
import MyProperties from './components/MyProperties';
import axios from 'axios';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/users/profile', {
        headers: {
          'x-auth-token': token,
        },
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user profile', error);
        localStorage.removeItem('token');
      });
    }
  }, []);

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home user={user} setUser={setUser} />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/sell-property" element={<SellProperty />} />
        <Route path="/my-properties" element={<MyProperties user={user} />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;


























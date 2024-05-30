import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import PropertyDetails from './components/PropertyDetails';
import PropertyList from './components/PropertyList';
import NavBar from './components/NavBar';
import SellProperty from './components/TempSellProperty';
import MyProperties from './components/MyProperties';
import UserPropertyDetails from './components/UserPropertyDetails'; // Import the new component
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
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
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="/home" element={<Home user={user} setUser={setUser} />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/sell-property" element={<SellProperty user={user} />} />
        <Route path="/my-properties" element={<MyProperties user={user} />} />
        <Route path="/my-properties/:id" element={<UserPropertyDetails user={user} />} /> {/* Add the new route */}
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
































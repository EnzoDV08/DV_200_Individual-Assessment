import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import PropertyDetails from './components/PropertyDetails';
import './styles.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Routes>
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home user={user} setUser={setUser} />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/" element={<Navigate to="/home" />} /> {/* Default route */}
      </Routes>
    </div>
  );
}

export default App;











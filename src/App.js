import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import Wishlist from './components/Wishlist';
import Feedback from './components/Feedback.jsx';
import ViewBooks from './components/ViewBooks';
import PurchasePage from './components/PurchasePage';
import UserDetails from './components/UserDetails.jsx';
import AddBooks from './components/AddBooks.jsx'; // Import UserDetails component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/view-books" element={<ViewBooks />} />
        <Route path="/user-purchase" element={<PurchasePage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/Feedback" element={<Feedback />} />
        <Route path="/user-details/:userId" element={<UserDetails />} /> {/* Add UserDetails route */}
        <Route path="/Add-book" element={<AddBooks />} />
        <Route path="/" element={<Navigate to="/user-dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;

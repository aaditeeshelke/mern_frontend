import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; // Assuming Sidebar component is in a separate file


const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://backend-r2wf.onrender.com/api/auth/users');
        if (response.ok) {
          const data = await response.json();
          const filteredUsers = data.filter(user => user.role !== 'admin');
          setUsers(filteredUsers);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`https://backend-r2wf.onrender.com/api/auth/users/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUsers(users.filter(user => user._id !== userId));
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://backend-r2wf.onrender.com/api/auth/users/${editingUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: editingUser.username,
          loginTime: editingUser.loginTime,
          logoutTime: editingUser.logoutTime,
        }),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map(user => (user._id === editingUser._id ? updatedUser.user : user)));
        setEditingUser(null);
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };
  const handleLogout = () => {
    window.location.href = '/admin-dashboard';
  };

  return (
    <div className="flex  ">
    <Sidebar handleLogout={handleLogout} />
    <div className="ml-64 p-4  max-w-7xl mx-auto">
      <div className="text-3xl font-bold mb-4 text-black-800 font-serif bg-orange-400 ml-4 mt-6 mb-4 py-2 px-4 rounded ">
        <h1 className=" p-4 text-3xl font-bold">user Details</h1>
      </div>
      <div className="overflow-x-auto mt-6 ml-6">
        <table className="min-w-full bg-white text-black shadow-md rounded-lg mt-6">
          <thead className="bg-indigo-300">
            <tr>
              <th className="py-2 px-4 text-left">Full Name</th>
              <th className="py-2 px-4 text-left">Username</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Phone Number</th>
              <th className="py-2 px-4 text-left">Login Date</th>
              <th className="py-2 px-4 text-left">Login Time</th>
              <th className="py-2 px-4 text-left">Logout Time</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-t">
                <td className="py-2 px-4">{user.fullName}</td>
                <td className="py-2 px-4">{user.username}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.mobile}</td>
                <td className="py-2 px-4">{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}</td>
                <td className="py-2 px-4">{user.lastLogin ? new Date(user.lastLogin).toLocaleTimeString() : 'N/A'}</td>
                <td className="py-2 px-4">{user.logoutTime ? user.logoutTime : 'N/A'}</td>
                <td className="py-2 px-4 space-x-2">
                  <button onClick={() => handleEditUser(user)} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700 transition duration-300">Edit</button>
                  <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 transition duration-300">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingUser && (
        <form className="mt-6 bg-white p-4 rounded-lg shadow-lg" onSubmit={handleEditSubmit}>
          <h3 className="text-2xl font-bold mb-4 text-indigo-600">Edit User</h3>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={editingUser.username}
            onChange={handleEditChange}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="text"
            name="loginTime"
            placeholder="Login Time"
            value={editingUser.loginTime}
            onChange={handleEditChange}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="text"
            name="logoutTime"
            placeholder="Logout Time"
            value={editingUser.logoutTime}
            onChange={handleEditChange}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <div className="flex space-x-2">
            <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300">Save</button>
            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300" onClick={() => setEditingUser(null)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
    </div>
  );
};

export default UserDetails;

import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaUser, FaSignOutAlt, FaPlusCircle, FaShoppingCart, FaChartBar } from 'react-icons/fa'; // Added FaChartBar for new dashboard menu
import { useSpring, animated } from '@react-spring/web';

const Sidebar = ({ handleLogout }) => {
  const sidebarAnimation = useSpring({
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0)' },
  });

  return (
    <animated.div style={sidebarAnimation} className="h-screen bg-gray-600 text-white w-64 p-6 h-200 fixed">
      <h2 className="  text-3xl font-bold mb-6 text-yellow-300 italic ml-4 mt-4 mb-4">Admin Dashboard</h2>
      <nav>
        <ul>
        <li className="mb-6 mt-12 ">
            <Link to="/admin-dashboard" className="flex items-center text-xl p-3  text-lg hover:text-yellow-500 hover:bg-gray-800 rounded-lg">
              <FaChartBar className="mr-4 text-white-500" size={24}/>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="mb-6 ">
            <Link to="/view-books" className="flex items-center text-xl p-3  text-lg hover:text-yellow-500 hover:bg-gray-800 rounded-lg">
              <FaBook className="mr-4 text-white-500" size={24}/>
              <span>View Books</span>
            </Link>
          </li>
          <li className="mb-6">
            <Link to="/user-purchase" className="flex items-center text-xl p-3  text-lg hover:text-yellow-500 hover:bg-gray-800 rounded-lg">
              <FaShoppingCart className="mr-4 text-white-500" size={24} />
              <span>Purchase Books</span>
            </Link>
          </li>
          <li className="mb-6">
            <Link to="/user-details/:userId" className="flex items-center text-xl p-3  text-lg hover:text-yellow-500 hover:bg-gray-800 rounded-lg">
              <FaUser className="mr-4 text-white-500" size={24}/>
              <span>User Details</span>
            </Link>
          </li>
          <li className="mb-6">
            <Link to="/add-book" className="flex items-center text-xl p-3  text-lg hover:text-yellow-500 hover:bg-gray-800 rounded-lg">
              <FaPlusCircle className="mr-4 text-white-500" size={24}/>
              <span>Add Books</span>
            </Link>
          </li>
         
          <li>
            <button 
              onClick={handleLogout} 
              className="flex items-center text-xl p-3  text-lg hover:text-yellow-500 hover:bg-gray-800 rounded-lg ">
              <FaSignOutAlt className="mr-4 text-white-500" size={24} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </animated.div>
  );
};

export default Sidebar;

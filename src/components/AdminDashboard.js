import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import axios from 'axios';
import { Line, Bar,Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend,ArcElement } from 'chart.js';
import './admin.css'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend,ArcElement);

const AdminDashboard = () => {
  const userId = localStorage.getItem('userId');
  const [isLoggedIn, setIsLoggedIn] = useState(!!userId);
 
  const [publisherCount, setPublisherCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [purchaseCount, setPurchaseCount] = useState(0);
  const [purchases, setPurchases] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);




  const handleLogout = async () => {
    try {
      await fetch('https://backend-r2wf.onrender.com/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      alert('Logout successful');
      localStorage.removeItem('userId');
      setIsLoggedIn(false);
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    axios.get('https://backend-r2wf.onrender.com/api/auth/publishers/count')
      .then(res => setPublisherCount(res.data.count))
      .catch(err => console.error(err));

    axios.get('https://backend-r2wf.onrender.com/api/auth/books/count')
      .then(res => setBookCount(res.data.count))
      .catch(err => console.error(err));

      axios.get('https://backend-r2wf.onrender.com/api/auth/purchases/by-date')
      .then(res => {
        const formattedData = res.data.map(item => ({
          ...item,
          purchaseDate: new Date(item._id) // Parse date string to Date object
        }));
        setPurchaseData(formattedData);
      })
      .catch(err => console.error('Error fetching purchase data:', err));


    axios.get('https://backend-r2wf.onrender.com/api/auth/users/count-by-role')
      .then(res => {
        setUserCount(res.data.users);
        setAdminCount(res.data.admins);
      })
      .catch(err => console.error(err));

      const fetchPurchaseData = async () => {
        try {
          const response = await axios.get('https://backend-r2wf.onrender.com/api/auth/purchases/by-publisher');
          setPurchases(response.data);
        } catch (error) {
          console.error('Error fetching purchase data:', error);
        }
      };
  
      fetchPurchaseData();
    }, []);
  
 // Format data for Line chart
 const lineChartData = {
  labels: purchaseData.map(item => new Date(item.
    purchaseDate).toLocaleDateString()),
  datasets: [
    {
      label: 'User Counts',
      data: purchaseData.map(item => item.userCount),
      fill: false,
      borderColor: 'rgba(75,192,192,1)',
      tension: 0.1,
    },
  ],
};

  // Bar chart data for Publishers and Books
  const barChartData = {
    labels: ['Publishers', 'Books'],
    datasets: [
      {
        label: 'Count',
        data: [publisherCount, bookCount],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Bar chart data for Users and Admins
  const barChartData1 = {
    labels: ['Users', 'Admins'],
    datasets: [
      {
        label: 'Count',
        data: [userCount, adminCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const publisherNames = purchases.map(purchase => purchase.publisher);
  const purchasedCopies = purchases.map(purchase => purchase.purchasedCopies);

  const pieChartData = {
    labels: purchases.map(item => item._id),
    datasets: [
      {
        label: 'Purchased Copies',
        data: purchasedCopies,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="flex  ">
      <Sidebar handleLogout={handleLogout} />
      <div className="ml-64  p-4 max-w-7xl mx-auto bg-purple-200">
        <div className=" bg-purple-500 text-black py-4 px-4 rounded -ml-4 -mt-4">
          <h1 className="  p-4 text-3xl font-bold">Welcome to Admin Dashboard</h1>
        </div>
        <div className="my-6"></div>
        <div className="flex space-x-6">
          <div className="w-1/2">
          <h2 className="text-xl font-bold mb-4">User and Admin Counts</h2>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <Bar data={barChartData1} width={500} height={250} />
            </div>
          </div>
          <div className="w-1/2">
            <h2 className="text-xl font-bold mb-4">Publisher and Book Count</h2>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <Bar data={barChartData} width={500} height={250} />
            </div>
          </div>
        </div>

       <div className="my-6"></div>
        <div className="flex justify-center">
          <div className="w-1/2">
          <h2 className="text-xl font-bold mb-4">publisher purchased book copies</h2>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <Pie data={pieChartData} width={500} height={250} />
            </div>
            </div>
            <div className="w-1/2">
            <h2 className="text-xl font-bold mb-4">User Counts over Purchase Dates</h2>
            <div className="bg-white p-4 rounded-lg shadow-lg ml-6">
              <Line data={lineChartData} width={500} height={250} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

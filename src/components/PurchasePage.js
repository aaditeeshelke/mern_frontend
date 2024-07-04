import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar'; 
const PurchasePage = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        console.log('Fetching purchases from backend'); // Log to indicate function is running
        const response = await fetch('https://backend-r2wf.onrender.com/api/auth/purchases');
        if (!response.ok) {
          throw new Error('Failed to fetch purchases');
        }
        const data = await response.json();
        console.log('Fetched purchases:', data); // Log the fetched data
        setPurchases(data);
      } catch (error) {
        console.error('Failed to fetch purchases:', error);
        setError(error); // Set the error state
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchPurchases();
  }, []);

  const groupedPurchases = purchases.reduce((acc, purchase) => {
    const userId = purchase.user._id;
    if (!acc[userId]) {
      acc[userId] = {
        user: purchase.user,
        books: [],
      };
    }
    acc[userId].books.push({
      bookName: purchase.book.bookName,
      totalCopies: purchase.book.totalCopies,
      purchasedCopies: purchase.book.purchasedCopies,
      purchaseDate: purchase.purchaseDate,
    });
    return acc;
  }, {});

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  const handleLogout = () => {
    window.location.href = '/admin-dashboard';
  };

  return (
    <div className="flex bg-gray-800">
    <Sidebar handleLogout={handleLogout} />
    <div className="ml-64 p-24  max-w-7xl mx-auto">
      <div className=" text-3xl font-bold mb-4 -mt-8 text-black-800 font-serif bg-orange-400 ml-4  py-2 px-4 rounded  ">
        <h1 className=" p-4 text-3xl font-bold">Purchased books</h1>
      </div>
    
      <div className="overflow-x-auto mt-8 ml-8">
        <table className="min-w-full  text-white border-collapse border border-gray-600">
          <thead>
            <tr>
              <th className="py-3 px-6 border border-gray-600">Full Name</th>
              <th className="py-3 px-6 border border-gray-600">Username</th>
              <th className="py-3 px-6 border border-gray-600">Book Name</th>
              <th className="py-3 px-6 border border-gray-600">Total Copies</th>
              <th className="py-3 px-6 border border-gray-600">Purchased Copies</th>
              <th className="py-3 px-6 border border-gray-600">Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(groupedPurchases).map(({ user, books }) => (
              <React.Fragment key={user._id}>
                <tr>
                  <td className="py-3 px-6 border border-gray-600" rowSpan={books.length}>
                    {user.fullName}
                  </td>
                  <td className="py-3 px-6 border border-gray-600" rowSpan={books.length}>
                    {user.username}
                  </td>
                  <td className="py-3 px-6 border border-gray-600">{books[0].bookName}</td>
                  <td className="py-3 px-6 border border-gray-600">{books[0].totalCopies}</td>
                  <td className="py-3 px-6 border border-gray-600">{books[0].purchasedCopies}</td>
                  <td className="py-3 px-6 border border-gray-600">
                    {new Date(books[0].purchaseDate).toLocaleDateString()}
                  </td>
                </tr>
                {books.slice(1).map((book, index) => (
                  <tr key={index}>
                    <td className="py-3 px-6 border border-gray-600">{book.bookName}</td>
                    <td className="py-3 px-6 border border-gray-600">{book.totalCopies}</td>
                    <td className="py-3 px-6 border border-gray-600">{book.purchasedCopies}</td>
                    <td className="py-3 px-6 border border-gray-600">
                      {new Date(book.purchaseDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default PurchasePage;

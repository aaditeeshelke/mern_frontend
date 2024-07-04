import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; // Assuming Sidebar component is in a separate file


const AddBooks = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    bookName: '',
    authorName: '',
    publisherName: '',
    publisherDate: '',
    totalCopies: '',
    imgUrl: '',
    description: ''
  });

  const handleAddBook = async (e) => {
    e.preventDefault();

    const bookDetails = {
      bookName: book.bookName,
      imgUrl: book.imgUrl,
      description: book.description,
      publisherDate: new Date(book.publisherDate),
      totalCopies: parseInt(book.totalCopies),
      purchasedCopies: 0,
    };

    const data = {
      publisherName: book.publisherName,
      authorName: book.authorName,
      bookDetails,
    };

    try {
      const response = await fetch('https://backend-r2wf.onrender.com/api/auth/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert('Book added successfully');
        setBook({
          bookName: '',
          authorName: '',
          publisherName: '',
          publisherDate: '',
          totalCopies: '',
          imgUrl: '',
          description: ''
        });
        navigate('/Add-book');
      } else {
        console.error('Failed to add book');
      }
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  };

  const handleBookChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };
  const handleLogout = () => {
    window.location.href = '/admin-dashboard';
  };

  return (
    <div className="flex bg-gray-800 ">
    <Sidebar handleLogout={handleLogout} />
    <div className="ml-64 p-12   max-w-7xl mx-auto">
      <div className=" text-3xl font-bold mb-4 text-black-800 font-serif bg-orange-400 ml-64 mt-4 mb-4 py-2 px-4 rounded-lg shadow-lg">
        <h1 className="p-4 text-3xl font-bold">Add Books </h1>
      </div>
      <div className="mb-6 bg-gray-600 p-4 rounded-lg shadow-lg mt-6 max-w-md mx-auto ml-64">
        <form onSubmit={handleAddBook} className="space-y-4">
          <input type="text" name="bookName" placeholder="Book Name" value={book.bookName} onChange={handleBookChange} className="w-full p-2 border rounded" required />
          <input type="text" name="authorName" placeholder="Author Name" value={book.authorName} onChange={handleBookChange} className="w-full p-2 border rounded" required />
          <input type="text" name="publisherName" placeholder="Publisher Name" value={book.publisherName} onChange={handleBookChange} className="w-full p-2 border rounded" required />
          <input type="date" name="publisherDate" placeholder="Publication Date" value={book.publisherDate} onChange={handleBookChange} className="w-full p-2 border rounded" required />
          <input type="number" name="totalCopies" placeholder="Total Copies" value={book.totalCopies} onChange={handleBookChange} className="w-full p-2 border rounded" required />
          <input type="text" name="imgUrl" placeholder="Image URL" value={book.imgUrl} onChange={handleBookChange} className="w-full p-2 border rounded" required />
          <textarea name="description" placeholder="Description" value={book.description} onChange={handleBookChange} className="w-full p-2 border rounded" required />
          <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300">Add Book</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddBooks;

import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar'; // Assuming Sidebar component is in a separate file

const ViewBooks = () => {
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editedBook, setEditedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 3; // Number of books per page

  useEffect(() => {
    const fetchPurchasedBooks = async () => {
      try {
        const response = await fetch('https://backend-r2wf.onrender.com/api/auth/purchased-books');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPurchasedBooks(data);
      } catch (error) {
        console.error('Failed to fetch purchased books:', error);
      }
    };

    fetchPurchasedBooks();
  }, []);

  const handleEditClick = (book) => {
    // Extract necessary fields from book and preserve publisherName and authorName
    const { _id, bookName, totalCopies, purchasedCopies, publisherName, authorName, ...rest } = book;

    // Set editedBook state
    setEditedBook({
      _id,
      bookName,
      totalCopies,
      purchasedCopies,
      publisherName, // Preserve publisherName
      authorName,   // Preserve authorName
      ...rest       // Include other fields if needed
    });
  };

  const handleDeleteClick = async (bookId) => {
    try {
      const response = await fetch(`https://backend-r2wf.onrender.com/api/auth/books/${bookId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      setPurchasedBooks(purchasedBooks.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error('Failed to delete book:', error);
    }
  };

  const handleSaveClick = async () => {
    try {
      const { _id, bookName, totalCopies, purchasedCopies } = editedBook;
      const response = await fetch(`https://backend-r2wf.onrender.com/api/auth/books/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookName, totalCopies, purchasedCopies }),
      });
      if (!response.ok) {
        throw new Error('Failed to edit book');
      }
      const updatedBook = await response.json();
      setPurchasedBooks(purchasedBooks.map((book) => (book._id === updatedBook._id ? updatedBook : book)));
      setEditedBook(null); // Reset editedBook state after successful save
    } catch (error) {
      console.error('Failed to edit book:', error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({ ...editedBook, [name]: value });
  };

  // Group books by publisher and author
  const groupedBooks = purchasedBooks.reduce((acc, book) => {
    const key = `${book.publisherName}_${book.authorName}`;
    if (!acc[key]) {
      acc[key] = {
        publisherName: book.publisherName,
        authorName: book.authorName,
        books: [],
      };
    }
    acc[key].books.push(book);
    return acc;
  }, {});

  // Flatten groupedBooks into an array of groups
  const groups = Object.values(groupedBooks);

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentGroups = groups.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(groups.length / booksPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLogout = () => {
    window.location.href = '/admin-dashboard';
  };

  return (
    <div className="flex">
    <Sidebar handleLogout={handleLogout} />
    <div className="ml-64 p-4 bg-gray-800 max-w-7xl mx-auto">
      <div className="bg-purple-600 text-white py-6 px-8 rounded -ml-4 -mt-4 ">
        <h1 className="text-3xl font-bold">Book Records</h1>
      </div>

     
        
        <div className="overflow-x-auto mt-2 -ml-3">
          <table className="min-w-full max-w-full bg-gray-800 text-white border-collapse border border-gray-600 ">
            <thead>
              <tr>
                <th className="py-3 px-6 border border-gray-600">Publisher</th>
                <th className="py-3 px-6 border border-gray-600">Author</th>
                <th className="py-3 px-6 border border-gray-600">Image</th>
                <th className="py-3 px-6 border border-gray-600">Book Name</th>
                <th className="py-3 px-6 border border-gray-600">Publication Date</th>
                <th className="py-3 px-6 border border-gray-600">Total Copies</th>
                <th className="py-3 px-6 border border-gray-600">Purchased Copies</th>
                <th className="py-3 px-6 border border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentGroups.map((group) => (
                <React.Fragment key={`${group.publisherName}_${group.authorName}`}>
                  {group.books.map((book, index) => (
                    <tr key={book._id} className="hover:bg-gray-600">
                      {index === 0 && (
                        <>
                          <td className="py-3 px-6 border border-gray-600" rowSpan={group.books.length}>
                            {group.publisherName}
                          </td>
                          <td className="py-3 px-6 border border-gray-600" rowSpan={group.books.length}>
                            {group.authorName}
                          </td>
                        </>
                      )}
                      <td className="py-3 px-6 border border-gray-600">
                        <img src={book.imgUrl} alt={book.bookName} className="h-16 w-16 object-contain" />
                      </td>
                      <td className="py-3 px-6 border border-gray-600">{book.bookName}</td>
                      <td className="py-3 px-6 border border-gray-600">{new Date(book.publisherDate).toLocaleDateString()}</td>
                      <td className="py-3 px-6 border border-gray-600">{book.totalCopies}</td>
                      <td className="py-3 px-6 border border-gray-600">{book.purchasedCopies}</td>
                      <td className="py-3 px-6 border border-gray-600">
                        <button
                          onClick={() => handleEditClick(book)}
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 transition duration-300 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(book._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 transition duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
         {/* Pagination Buttons */}
         <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index + 1)}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === index + 1 ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-700'
              } hover:bg-gray-400`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {editedBook && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-3/4 md:w-1/2 lg:w-1/3 relative">
              <h2 className="text-2xl font-bold mb-4 text-indigo-700">Edit Book</h2>
              <label className="block mb-2">
                <span className="text-gray-700">Book Name</span>
                <input
                  type="text"
                  name="bookName"
                  value={editedBook.bookName}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                />
              </label>
              <label className="block mb-2">
                <span className="text-gray-700">Total Copies</span>
                <input
                  type="number"
                  name="totalCopies"
                  value={editedBook.totalCopies}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                />
              </label>
              <label className="block mb-2">
                <span className="text-gray-700">Purchased Copies</span>
                <input
                  type="number"
                  name="purchasedCopies"
                  value={editedBook.purchasedCopies}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                />
              </label>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSaveClick}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditedBook(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300 ml-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      


      {/* Add any additional content for the Admin Dashboard here */}
    </div>
  </div>
);
};
   

export default ViewBooks;

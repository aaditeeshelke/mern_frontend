import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faStar as faStarEmpty } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';
import ContactUs from './ContactUs.jsx';
import NewArrivals from './NewArrivals.jsx'; 

const testimonials = [
  {
    image: 'https://images01.nicepage.com/c461c07a441a5d220e8feb1a/a5a678d8dfcf5f8dabb3c9bf/w.jpg',
    text: 'Vitae suscipit tellus mauris a diam maecenas sed enim ut. Mauris augue neque gravida in fermentum. Praesent semper feugiat nibh sed pulvinar proin.',
    name: 'Nat Reynolds',
    place: 'Book : Beutiful days',
    rating: 4.5,
  },
  {
    image: 'https://images01.nicepage.com/c461c07a441a5d220e8feb1a/c09014f9e7715438bb869fbb/ds.jpg',
    text: 'Pharetra vel turpis nunc eget lorem. Quisque id diam vel quam elementum pulvinar etiam. Urna porttitor rhoncus dolor purus non enim praesent elementum.',
    name: 'Celia Almeda',
    place: 'Book : Harry Potter and  Stone',
    rating: 4,
  },
  {
    image: 'https://images01.nicepage.com/c461c07a441a5d220e8feb1a/980d881d762859b98207594a/hgghgh.jpg',
    text: 'Mauris augue neque gravida in fermentum. Praesent semper feugiat nibh sed pulvinar proin. Nibh nisl dictumst vestibulum rhoncus est pellentesque elit.',
    name: 'Bob Roberts',
    place: 'Book : The Hobbit',
    rating: 5,
  },
];

const Testimonials = () => {
  const Stars = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex justify-center mb-4">
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <FontAwesomeIcon key={`full-${index}`} icon={faStar} className="text-yellow-500" />
          ))}
        {hasHalfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <FontAwesomeIcon key={`empty-${index}`} icon={faStarEmpty} className="text-yellow-500" />
          ))}
      </div>
    );
  };

  return (
    <section className="bg-blue-100 py-8 -mt-4">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Happy Customers</h1>
        <p className="text-gray-600 mb-8">We place huge value on strong relationships and have seen the benefit they bring to our business. Customer feedback is vital in helping us to get it right.</p>
        <div className="flex flex-wrap -mx-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`w-full md:w-1/2 lg:w-1/3 px-4 mb-8 animate__animated ${
                index % 2 === 0 ? 'animate__fadeInLeft' : 'animate__fadeInRight'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white"
                />
                <Stars rating={testimonial.rating} />
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <h5 className="text-xl font-semibold text-yellow-500">{testimonial.name}</h5>
                <h6 className="text-blue-700">{testimonial.place}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



const UserDashboard = () => {
  const [publishers, setPublishers] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 4;
  const userId = localStorage.getItem('userId');
  const [isLoggedIn, setIsLoggedIn] = useState(!!userId); // Check if user is logged in

  // Array of image URLs for the carousel
  const carouselImages = [
    {
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'A Home for Bookworms',
      text: 'Where Every Page Has a Story'
    },
    {
      image: 'https://img.freepik.com/free-photo/pile-books-blue-background_23-2147767236.jpg?t=st=1718609753~exp=1718613353~hmac=c752fb564a8be4cc9edae11f3cc2969fd6cd922af9c5ab06cbd0294128946bfa&w=996',
      title: 'Dive into Knowledge',
      text: 'Explore the Depths of Every Book'
    },
    {
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Expand Your Horizons',
      text: 'Every Book is a New Adventure'
    },
    {
      image: 'https://images.unsplash.com/photo-1551029506-0807df4e2031?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Stacked with Stories',
      text: 'A Collection of Wonders Awaits You'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const nextIndex = (currentIndex + 1) % carouselImages.length;
        carouselRef.current.goToSlide(nextIndex);
        setCurrentIndex(nextIndex);
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex, carouselImages.length]);

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const response = await fetch('https://backend-r2wf.onrender.com/api/auth/publishers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPublishers(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error('Failed to fetch publishers:', error);
      }
    };

    fetchPublishers();
  }, []);

  useEffect(() => {
    const results = [];
    publishers.forEach((publisher) => {
      publisher.authors.forEach((author) => {
        author.books.forEach((book) => {
          if (
            book.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            author.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            publisher.publisherName.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            results.push({ ...book, authorName: author.authorName, publisherName: publisher.publisherName });
          }
        });
      });
    });
    setFilteredBooks(results);
  }, [searchQuery, publishers]);

  const handleLogout = async () => {
    try {
      await fetch('https://backend-r2wf.onrender.com/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      alert('Logout successful');
      localStorage.removeItem('userId'); // Remove userId from localStorage
      setIsLoggedIn(false); // Update login state
      window.location.href = '/user-dashboard';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleViewMore = (book) => {
    setSelectedBook(book);
  };

  const handleAddToFavorites = (book) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let existingBook = favorites.find((favBook) => favBook._id === book._id);
    if (!isLoggedIn) {
      alert('Please login to add and view this book in whishlist');
      navigate('/login');
      return;
    }

    if (existingBook) {
      existingBook.count = (existingBook.count || 0) + 1;
    } else {
      favorites.push({ ...book, count: 1 });
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));

    const updatedPublishers = publishers.map((publisher) => {
      const updatedAuthors = publisher.authors.map((author) => {
        const updatedBooks = author.books.map((b) => {
          if (b._id === book._id) {
            return { ...b, count: (b.count || 0) + 1 };
          }
          return b;
        });
        return { ...author, books: updatedBooks };
      });
      return { ...publisher, authors: updatedAuthors };
    });
    setPublishers(updatedPublishers);
  };

  const handleBuyNow = async (book) => {
    if (!isLoggedIn) {
      alert('Please login to buy this book');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('https://backend-r2wf.onrender.com/api/auth/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, bookId: book._id }),
      });

      if (!response.ok) {
        throw new Error('Purchase failed');
      }

      const data = await response.json();
      console.log('Purchase successful:', data);

      // Update the state for the purchased book
      const updatedBooks = publishers.map((publisher) => {
        return {
          ...publisher,
          authors: publisher.authors.map((author) => {
            return {
              ...author,
              books: author.books.map((b) => {
                if (b._id === book._id) {
                  return {
                    ...b,
                    totalCopies: b.totalCopies - 1,
                    purchasedCopies: b.purchasedCopies + 1,
                  };
                }
                return b;
              }),
            };
          }),
        };
      });

      setPublishers(updatedBooks);

      alert('Purchase successful');
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed');
    }
  };

  const navigate = useNavigate();

  const handleViewWishlist = () => {
    navigate('/wishlist');
  };
  const handleFeedback = () => {
    navigate('/Feedback');
  };
  

  const handleLogin = () => {
    navigate('/login');
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="container mx-auto p-4">
    <h2 className="text-3xl font-bold mb-2 -mt-1 text-indigo-600 bg-blue-700 py-4 text-center text-white">Welcome to User Dashboard</h2>
    {isLoggedIn && (
      <div className="flex justify-between -mt-2 bg-blue-200 py-6">
        <div className="space-x-2 ml-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
          <button
            onClick={handleViewWishlist}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            View Wishlist
          </button>
          <button
            onClick={handleFeedback}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
          >
           Feedback 
          </button>
        </div>
      </div>
    )}
    {!isLoggedIn && (
  <div className="flex justify-end">
    <button
      onClick={handleLogin}
      className="bg-blue-500 text-white px-6 py-2 mb-4  mr-5 rounded hover:bg-red-700 transition duration-300"
    >
      Login
    </button>
  </div>
)}
        {/* Carousel */}
        <div className="mb-8">
        <Carousel
          ref={carouselRef}
          additionalTransfrom={0}
          arrows
          autoPlay={false}
          centerMode={false}
          className="w-full"
          containerClass="carousel-container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 1,
              partialVisibilityGutter: 40,
            },
          }}
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {carouselImages.map((slide, index) => (
            <div key={index} className="w-full h-88vh md:h-screen relative">
              <img src={slide.image} alt={`Carousel Image ${index}`} className="w-full h-full object-cover rounded" />
              <div className="carousel-text">
                <h1>{slide.title}</h1>
                <p>{slide.text}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <Testimonials />
      < NewArrivals/>
      

      <div className="flex justify-center mt-8  ">
  <input
    type="text"
    placeholder="Search by book name, author, or publisher"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-1/2 p-2 mb-8 border rounded"
  />
</div>


 {/* Book Grid */}
 <div className="book-grid">
          {currentBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl border border-indigo-300 hover:border-indigo-500 hover:bg-indigo-100 hover:text-indigo-900 hover:-translate-y-2 relative"
            >
              <img src={book.imgUrl} alt={book.bookName} className="h-40 w-full object-contain mb-4 rounded" />
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => handleAddToFavorites(book)}
                  className="bg-transparent text-red-500 rounded-full p-2 hover:bg-red-100 transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill={localStorage.getItem('favorites') && JSON.parse(localStorage.getItem('favorites')).some(b => b._id === book._id) ? 'red' : 'none'}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 21l-1.45-1.316C5.61 15.762 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.91 4.5 2.336C13.09 3.91 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.61 7.262-8.55 11.184L12 21z"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-grow flex flex-col justify-between w-full">
                <div className="text-center">
                  <h4 className="font-semibold text-lg mb-2 text-indigo-700">{book.bookName}</h4>
                  <p className="text-gray-600 mb-1">Author: {book.authorName}</p>
                  <p className="text-gray-600 mb-1">Publisher: {book.publisherName}</p>
                  <p className="text-gray-600 mb-1">{new Date(book.publisherDate).toLocaleDateString()}</p>
                  <p className="text-gray-600 mb-1">Total Copies: {book.totalCopies}</p>
                  <p className="text-gray-600 mb-1">Purchased Copies: {book.purchasedCopies}</p>
                  <p className="text-gray-600 mb-1">Added to Favorites: {book.count || 0}</p>
                </div>
                <div className="flex justify-between mt-4 w-full">
                  <button
                    onClick={() => handleViewMore(book)}
                    className="bg-indigo-500 text-white w-1/2 py-1 rounded hover:bg-indigo-700 transition duration-300 mr-1"
                  >
                    View More
                  </button>
                  <button
                    onClick={() => handleBuyNow(book)}
                    className="bg-green-500 text-white w-1/2 py-1 rounded hover:bg-green-700 transition duration-300 ml-1"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index + 1)}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === index + 1 ? 'bg-indigo-500 text-white' : 'bg-gray-300'
            } hover:bg-gray-400`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Contact Us Section */}
      <ContactUs />

      {selectedBook && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-center text-indigo-600">{selectedBook.bookName}</h3>
            <img src={selectedBook.imgUrl} alt={selectedBook.bookName} className="h-48 w-full object-contain mb-4 rounded" />
            <p className="text-gray-600 mb-2"><strong>Author:</strong> {selectedBook.authorName}</p>
            <p className="text-gray-600 mb-2"><strong>Publisher:</strong> {selectedBook.publisherName}</p>
            <p className="text-gray-600 mb-2"><strong>Published Date:</strong> {new Date(selectedBook.publisherDate).toLocaleDateString()}</p>
            <p className="text-gray-600 mb-2"><strong>Total Copies:</strong> {selectedBook.totalCopies}</p>
            <p className="text-gray-600 mb-2"><strong>Description:</strong> {selectedBook.description}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white w-1/2 py-1 rounded hover:bg-red-700 transition duration-300 mr-1"
              >
                Close
              </button>
              <button
                onClick={() => handleBuyNow(selectedBook)}
                className="bg-indigo-500 text-white w-1/2 py-1 rounded hover:bg-indigo-700 transition duration-300 ml-1"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
import React from 'react';
import Slider from 'react-slick';

// Import CSS files for react-slick carousel directly from react-slick package
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const newArrivals = [
  {
    image: 'https://m.media-amazon.com/images/I/41C765Vtf3L._SY445_SX342_.jpg',
    title: 'Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    offer: '50%',
    price: '₹487',
    originalPrice: '₹795',
    
  },
  {
    image: 'https://m.media-amazon.com/images/I/61d+deL0NmL._SY445_SX342_.jpg',
    title: 'Girl Who Knew Too Much',
    author: 'Vikrant Khanna',
    offer: '30%',
    price: '₹487',
    originalPrice: '₹695',
  },
  {
    image: 'https://m.media-amazon.com/images/I/51fSHBuMmtL._SY445_SX342_.jpg',
    title: 'The Wind on the Haunted Hill',
    author: 'Ruskin  Bond',
    offer: '10%',
    price: '₹900',
    originalPrice: '₹1000',
   
  },
  {
    image: 'https://d2g9wbak88g7ch.cloudfront.net/productimages/mainimages/601/9789357027601.jpg',
    title: 'Bharat Matters',
    author: 'S. Jaishankar',
    offer: '30%',
    price: '₹487',
    originalPrice: '₹695',
    
  },
  // Add more books as needed
];

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4, // Number of slides to show at a time
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1000, // Time between slides in milliseconds
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const NewArrivals = () => {
  return (
    <section className="bg-gray-200 py-8">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">New Arrivals</h1>
        <p className="text-green-600 text-3xl mb-8">Discover the latest additions to our collection. Don't miss out on these new arrivals!</p>
        <Slider {...settings}>
          {newArrivals.map((book, index) => (
            <div key={index} className="mx-4 px-2 h-full ">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg h-full ">
                <div className="relative h-64 bg-yellow-200">
                  <div className="offer absolute top-0 left-0 bg-red-500 text-white px-2 py-1 z-10 ">{book.offer}</div>
                  <a >
                  <img className="w-64 h-50 object-cover mb-4 px-16 py-8 ml-12    " src={book.image} alt={book.title} />
                  </a>
                </div>
                <div className="p-4 bg-yellow-200">
                  <h5 className="text-lg font-semibold">{book.title}</h5>
                  <p className="text-gray-600">{book.author}</p>
                  <div className="flex justify-center mt-2">
                  <span className="text-gray-600 ml-2">No Review Yet</span>
                </div>
                  <div className="mt-2">
                    <span className="text-lg font-bold text-red-600">{book.price}</span>
                    <span className="line-through text-gray-600 ml-2">{book.originalPrice}</span>
                  </div>
                  <div className="mt-4">
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default NewArrivals;

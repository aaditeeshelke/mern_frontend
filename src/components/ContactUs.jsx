import React, { useState } from 'react';

import './Contact.css';

function ContactUs() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMessageSent, setMessageSent] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleSend = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const emailParams = {
      from_email: formData.get('email'),
      message: formData.get('message'),
    };

   
  };

  return (
    <div className="relative h-screen1 bg-fixed bg-center bg-no-repeat bg-cover mt-4" style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/top-view-telephone-receiver-with-cord_23-2148796007.jpg?w=996&t=st=1719894123~exp=1719894723~hmac=814ac8a44e318f4531b40fc1be8a838493726a33e11a377e772d96b5021a7462)' }}>
      <div className="flex flex-col items-center justify-center h-full bg-blue-400 bg-opacity-30 ">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-lime-100 mb-4 drop-shadow-lg">Contact Us Today</h1>
        <h3 className="text-lg md:text-2xl lg:text-3xl font-playfair font-bold text-yellow-50 mb-6 drop-shadow-md">
        Your Gateway to a World of Books.
        </h3>
        <button 
          className="h-12 w-52 text-lg md:text-xl lg:text-2xl text-white bg-transparent border-2 border-white rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-gradient-to-r hover:from-blue-500 hover:to-red-500 shadow-lg"
          onClick={toggleModal}
        >
          CONTACT US
        </button>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-2xl mx-4 md:mx-0 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Get in Touch</h2>
            <form onSubmit={handleSend}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input type="text" name="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input type="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                <textarea name="message" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" required></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Send</button>
                <button type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={toggleModal}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isMessageSent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Message Successfully Sent</h2>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => setMessageSent(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactUs;

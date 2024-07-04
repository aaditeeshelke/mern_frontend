import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCheckCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

const Feedback = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [experience, setExperience] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [yesNoQuestions, setYesNoQuestions] = useState({
    question1: '',
    question2: '',
  });
  const [ratingQuestions, setRatingQuestions] = useState({
    question3: '',
    question4: '',
  });
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleYesNoChange = (e) => {
    setYesNoQuestions({
      ...yesNoQuestions,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingQuestionChange = (e) => {
    setRatingQuestions({
      ...ratingQuestions,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmojiClick = (emoji) => {
    setExperience(emoji);
    setSelectedEmoji(emoji);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle feedback form submission
    console.log({
      fullName,
      email,
      rating,
      feedback,
      experience,
      yesNoQuestions,
      ratingQuestions,
    });
    setShowSuccess(true);
    setFullName('');
    setEmail('');
    setRating(0);
    setFeedback('');
    setExperience('');
    setYesNoQuestions({ question1: '', question2: '' });
    setRatingQuestions({ question3: '', question4: '' });
    setSelectedEmoji('');
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleBack = () => {
    navigate('/user-dashboard'); // Navigate back to userdashboard page
  };

  return (
    <div className="bg-cover bg-center min-h-screen flex items-center justify-center py-12 " style={{ backgroundImage: `url('https://cdn.pixabay.com/photo/2016/01/08/20/32/bookstore-1129183_960_720.png')` }}>
      <div className="flex justify-center items-center h-full w-full">
        <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg relative">
          {showSuccess && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center z-50 shadow-lg">
              <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
              <span className="font-semibold">Feedback Submitted Successfully!</span>
            </div>
          )}
          <div className="mb-4 flex justify-start">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-300 mr-2"
              onClick={handleBack}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Back
            </button>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-center text-indigo-600">We Value Your Feedback</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="fullName">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="mb-4 flex items-center">
              <label className="block text-gray-700 font-bold mb-2 mr-4">Was the website easy to navigate?</label>
              <div className="flex">
                <label className="mr-4 ml-8">
                  <input
                    type="radio"
                    name="question1"
                    value="Yes"
                    checked={yesNoQuestions.question1 === 'Yes'}
                    onChange={handleYesNoChange}
                  />{' '}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="question1"
                    value="No"
                    checked={yesNoQuestions.question1 === 'No'}
                    onChange={handleYesNoChange}
                  />{' '}
                  No
                </label>
              </div>
            </div>
            <div className="mb-4 flex items-center">
              <label className="block text-gray-700 font-bold mb-2 mr-4">Was the checkout process smooth?</label>
              <div className="flex">
                <label className="mr-4 ml-8">
                  <input
                    type="radio"
                    name="question2"
                    value="Yes"
                    checked={yesNoQuestions.question2 === 'Yes'}
                    onChange={handleYesNoChange}
                  />{' '}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="question2"
                    value="No"
                    checked={yesNoQuestions.question2 === 'No'}
                    onChange={handleYesNoChange}
                  />{' '}
                  No
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Rate the book selection</label>
              <select
                name="question3"
                className="w-full px-3 py-2 border rounded"
                value={ratingQuestions.question3}
                onChange={handleRatingQuestionChange}
              >
                <option value="">Select</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Average">Average</option>
                <option value="Poor">Poor</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">How was your overall experience?</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className={`text-2xl ${selectedEmoji === '😃' ? 'text-yellow-500 border-yellow-500' : 'text-gray-400'} focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent border-2 rounded-full p-2`}
                  onClick={() => handleEmojiClick('😃')}
                >
                  😃
                </button>
                <button
                  type="button"
                  className={`text-2xl ${selectedEmoji === '😊' ? 'text-yellow-500 border-yellow-500' : 'text-gray-400'} focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent border-2 rounded-full p-2`}
                  onClick={() => handleEmojiClick('😊')}
                >
                  😊
                </button>
                <button
                  type="button"
                  className={`text-2xl ${selectedEmoji === '😐' ? 'text-yellow-500 border-yellow-500' : 'text-gray-400'} focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent border-2 rounded-full p-2`}
                  onClick={() => handleEmojiClick('😐')}
                >
                  😐
                </button>
                <button
                  type="button"
                  className={`text-2xl ${selectedEmoji === '😔' ? 'text-yellow-500 border-yellow-500' : 'text-gray-400'} focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent border-2 rounded-full p-2`}
                  onClick={() => handleEmojiClick('😔')}
                >
                  😔
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="feedback">
                Additional Feedback
              </label>
              <textarea
                id="feedback"
                className="w-full px-3 py-2 border rounded"
                rows="4"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 mr-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;

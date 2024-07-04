import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://backend-r2wf.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        navigate(data.redirect);
        localStorage.setItem('userId', data.userId);
        console.log('Login time:', data.loginTime);
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: 'url(https://img.freepik.com/free-photo/wooden-shelf-tropical-forest-product-presentation-dark-green-background_41470-5139.jpg?w=900&t=st=1719302817~exp=1719303417~hmac=d847817fc00a1b7f6d90b88b95df1d009d9d09ffe3617eb49b42452ab0a118db',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <animated.div
        style={fadeIn}
        className="flex flex-col md:flex-row w-full max-w-4xl shadow-lg bg-white bg-opacity-80 rounded-lg overflow-hidden "
      >
        <div className="md:w-1/2 flex items-center justify-center p-6 bg-white bg-opacity-60 rounded-t-lg md:rounded-tr-none md:rounded-l-lg">
          <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-indigo-600 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1584801096196-592feb269e31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3N0b3JlfGVufDB8fDB8fHww"
              alt="Amazing view"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center bg-white bg-opacity-60 rounded-b-lg md:rounded-bl-none md:rounded-r-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>
          <p className="text-center text-gray-700 mb-6">We're happy to see you again. Please login to continue.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-2 border border-indigo-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-transform transform hover:scale-105 bg-gray-50 shadow-md"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-2 border border-indigo-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-transform transform hover:scale-105 bg-gray-50 shadow-md"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 tracking-wide text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500 transition-transform transform hover:scale-105 shadow-lg"
              >
                Login
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Register here
            </Link>
          </p>
          <p className="mt-2 text-center text-gray-600">
            Or{' '}
            <Link to="/" className="text-indigo-600 hover:underline">
              go to home page
            </Link>
          </p>
        </div>
      </animated.div>
    </div>
  );
};

export default Login;

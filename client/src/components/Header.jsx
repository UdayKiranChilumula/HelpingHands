import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHandsHelping } from "react-icons/fa";

const Header = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?searchTerm=${encodeURIComponent(searchTerm)}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [window.location.search]);

  return (
    <header className="bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 p-3 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-white text-2xl font-bold tracking-wide">
            <Link to="/" className="flex items-center space-x-2">
              <FaHandsHelping className="text-3xl text-white" />
              <span>Helping Hands</span>
            </Link>
          </div>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className="text-white px-3 py-2 rounded-md hover:bg-yellow-400 hover:text-black transition-all duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-white px-3 py-2 rounded-md hover:bg-yellow-400 hover:text-black transition-all duration-300"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          {currentUser ? (
            <Link to="/profile">
              <img
                className="rounded-full h-9 w-9 object-cover border-2 border-white shadow-lg"
                src={currentUser.avatar}
                alt="profile"
              />
            </Link>
          ) : (
            <Link
              to="/signin"
              className="text-white px-3 py-2 rounded-md hover:bg-yellow-400 hover:text-black transition-all duration-300"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

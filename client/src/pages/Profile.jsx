import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignOut from '../pages/SignOut';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState({ username: '', email: '', password: '', avatar: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      setUserData({
        username: currentUser.username || '',
        email: currentUser.email || '',
        password: '',
        avatar: currentUser.avatar || '',
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        if (!currentUser || !currentUser._id) {
          throw new Error('User ID is missing');
        }
        await axios.delete(`http://localhost:4000/api/user/delete/${currentUser._id}`);
        navigate('/signin');
      } catch (err) {
        setError(err.response?.data?.message || 'Error deleting account');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center text-teal-600">Profile Page</h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <div className="mb-8 flex flex-col items-center justify-center space-y-4">
        {userData.avatar && (
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-teal-600 shadow-md">
            <img src={userData.avatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        )}
        <h2 className="text-xl font-semibold text-gray-800">{userData.username}</h2>
        <p className="text-gray-600">{userData.email}</p>
      </div>

      <div className="mt-6 flex flex-col items-center space-y-4">
        <button
          onClick={handleDelete}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300"
        >
          Delete Account
        </button>
        <SignOut />
      </div>
    </div>
  );
};

export default ProfilePage;

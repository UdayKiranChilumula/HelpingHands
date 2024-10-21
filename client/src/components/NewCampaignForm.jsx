import React, { useState } from 'react';
import axios from 'axios';

const NewCampaignForm = ({ addCampaign }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goalAmount: '',
    category: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/campaigns', formData);
      addCampaign(response.data);
      setFormData({
        title: '',
        description: '',
        goalAmount: '',
        category: '',
        imageUrl: '',
      });
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  return (
    <form className="bg-white shadow-lg rounded-lg p-6 mb-8" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-semibold mb-4 text-teal-600">Create New Campaign</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Goal Amount</label>
        <input
          type="number"
          name="goalAmount"
          value={formData.goalAmount}
          onChange={handleChange}
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        >
          <option value="">Select Category</option>
          <option value="Medical">Medical</option>
          <option value="Disaster Relief">Disaster Relief</option>
          <option value="Education">Education</option>
          <option value="Charity">Charity</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Image URL</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <button
        type="submit"
        className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        Create Campaign
      </button>
    </form>
  );
};

export default NewCampaignForm;

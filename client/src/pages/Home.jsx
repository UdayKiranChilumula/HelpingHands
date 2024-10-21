import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); // State to track selected category

  // Fetch all campaigns when the component mounts
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/campaigns');
        // Filter out completed campaigns
        const activeCampaigns = response.data.filter(campaign => campaign.status === 'Active');
        setCampaigns(activeCampaigns);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  // Filter campaigns by selected category
  const filteredCampaigns = selectedCategory === 'All'
    ? campaigns
    : campaigns.filter(campaign => campaign.category === selectedCategory);

  // Sidebar categories
  const categories = ['All', 'Medical', 'Disaster Relief', 'Education', 'Charity', 'Others'];

  return (
    <div className="container mx-auto mt-10 p-4 flex">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-white shadow-lg p-4 rounded-lg mb-8 lg:mb-0 lg:mr-6">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Filter by Category</h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer p-2 rounded-lg text-gray-700 hover:bg-teal-200 transition ${
                selectedCategory === category ? 'bg-teal-400 text-white' : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Campaigns */}
      <div className="w-full">
        <h1 className="text-4xl font-bold text-center mb-8">Crowdfunding Campaigns</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => {
            const progress = (campaign.raisedAmount / campaign.goalAmount) * 100; // Calculate progress percentage

            return (
              <Link to={`/campaign/${campaign._id}`} key={campaign._id}>
                <div
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200 p-2 max-w-xs mx-auto cursor-pointer"
                >
                  {/* Campaign Image */}
                  <img
                    src={campaign.imageUrl}
                    alt={campaign.title}
                    className="w-full h-32 object-cover"
                  />

                  {/* Card content */}
                  <div className="p-2">
                    <h2 className="text-lg font-semibold mb-1 text-indigo-700">
                      {campaign.title.length > 30
                        ? campaign.title.substring(0, 25) + '...'
                        : campaign.title}
                    </h2>

                    <p className="text-sm text-gray-600 mb-1">
                      {campaign.description.length > 100
                        ? campaign.description.substring(0, 100) + '...'
                        : campaign.description}
                    </p>

                    {/* Raised Amount and Goal */}
                    <p className="text-sm font-bold mb-1 text-gray-700">
                    ₹{campaign.raisedAmount} raised of ₹{campaign.goalAmount}
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;

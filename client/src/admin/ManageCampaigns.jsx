import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewCampaignForm from '../components/NewCampaignForm';

const ManageCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/campaigns');
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  const addCampaign = (newCampaign) => {
    setCampaigns([...campaigns, newCampaign]);
  };

  const deleteCampaign = async (campaignId) => {
    try {
      await axios.delete(`http://localhost:4000/api/campaigns/${campaignId}`);
      setCampaigns(campaigns.filter(campaign => campaign._id !== campaignId));
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  const updateStatus = async (campaignId, newStatus) => {
    try {
      const updatedCampaign = await axios.put(`http://localhost:4000/api/campaigns/${campaignId}`, { status: newStatus });
      setCampaigns(campaigns.map(campaign =>
        campaign._id === campaignId ? updatedCampaign.data : campaign
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleStatusChange = (campaignId, event) => {
    const newStatus = event.target.value;
    updateStatus(campaignId, newStatus);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 px-6 py-4 text-white">
          <h2 className="text-3xl font-semibold text-center">Manage Campaigns</h2>
        </div>

        <div className="px-6 py-4">
          {/* New Campaign Form */}
          <NewCampaignForm addCampaign={addCampaign} />

          {/* Campaigns Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-bold text-gray-600 uppercase">Title</th>
                  <th className="py-3 px-6 text-left text-xs font-bold text-gray-600 uppercase">Goal Amount</th>
                  <th className="py-3 px-6 text-left text-xs font-bold text-gray-600 uppercase">Raised Amount</th>
                  <th className="py-3 px-6 text-left text-xs font-bold text-gray-600 uppercase">Category</th>
                  <th className="py-3 px-6 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                  <th className="py-3 px-6 text-left text-xs font-bold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map(campaign => (
                  <tr key={campaign._id} className="border-b transition hover:bg-gray-100">
                    <td className="py-4 px-6 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">{campaign.title}</p>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">${campaign.goalAmount}</p>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">${campaign.raisedAmount}</p>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">{campaign.category}</p>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {/* Dropdown for status */}
                      <select
                        value={campaign.status}
                        onChange={(e) => handleStatusChange(campaign._id, e)}
                        className={`
                          py-2 px-3 rounded-full text-sm font-medium transition 
                          ${campaign.status === 'Active' ? 'bg-yellow-100 text-yellow-600 border-yellow-300' : 
                          campaign.status === 'Completed' ? 'bg-green-100 text-green-600 border-green-300' :
                          'bg-red-100 text-red-600 border-red-300'}
                        `}
                      >
                        <option value="Active" className="bg-white">Active</option>
                        <option value="Completed" className="bg-white">Completed</option>
                        <option value="Cancelled" className="bg-white">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition transform hover:scale-105"
                        onClick={() => deleteCampaign(campaign._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCampaigns;

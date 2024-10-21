import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  

const Campaign = () => {
  const { id } = useParams();
  const { currentUser } = useAuth(); 
  const [campaign, setCampaign] = useState(null); 
  const [amount, setAmount] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/campaigns/${id}`);
        setCampaign(response.data);
      } catch (error) {
        console.error('Error fetching campaign:', error);
      }
    };
    fetchCampaign();
  }, [id]);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/signin');  // Redirect to sign-in page if user is not signed in
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/create-payment-session', {
        amount,
        campaignId: campaign._id,
        email: currentUser?.email, 
      });

      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error initiating payment:', error);
      setLoading(false);
    }
  };

  const getProgressPercentage = () => {
    if (!campaign) return 0;
    return (campaign.raisedAmount / campaign.goalAmount) * 100;
  };

  return (
    <div className="campaign-page max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {campaign ? (
        <div className="flex flex-col lg:flex-row items-start">
          {/* Campaign Image */}
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <img src={campaign.imageUrl} alt={campaign.title} className="w-full h-96 object-cover rounded-lg shadow-lg" />
          </div>

          {/* Campaign Details and Progress */}
          <div className="lg:w-1/2 w-full lg:pl-10">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">{campaign.title}</h1>
            <p className="text-lg text-gray-700 mb-6">{campaign.description}</p>

            {/* Progress Bar */}
            <div className="mb-6">
              <p className="text-xl mb-2"><strong>Goal:</strong> ₹{campaign.goalAmount}</p>
              <p className="text-xl mb-2"><strong>Raised:</strong> ₹{campaign.raisedAmount}</p>
              <div className="w-full bg-gray-200 rounded-full h-6">
                <div
                  className="bg-blue-600 h-6 rounded-full"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
              <p className="text-sm mt-2">{Math.round(getProgressPercentage())}% funded</p>
            </div>

            {/* Donate Button */}
            <button 
              onClick={() => setShowPaymentForm(true)} 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all">
              Donate Now
            </button>

            {/* Payment Form */}
            {showPaymentForm && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <form onSubmit={handlePayment} className="bg-white p-8 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">" Helping hands are better than praying lips "</h2>
                  <label className="block mb-2 text-gray-600 text-lg">
                    Donation Amount (INR):
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      className="block w-full mt-2 p-2 border border-gray-300 rounded-md"
                    />
                  </label>
                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="bg-green-600 text-white px-6 py-3 rounded-lg mt-4 hover:bg-green-700 transition-all">
                    {loading ? 'Processing...' : 'Proceed to Payment'}
                  </button>
                  <button 
                    onClick={() => setShowPaymentForm(false)} 
                    className="ml-4 bg-red-600 text-white px-6 py-3 rounded-lg mt-4 hover:bg-red-700 transition-all">
                    Cancel
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-600">Loading campaign...</p>
      )}
    </div>
  );
};

export default Campaign;

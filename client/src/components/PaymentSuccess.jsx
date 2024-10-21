import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const search = useLocation().search;
  const amount = new URLSearchParams(search).get('amount');
  const campaignId = new URLSearchParams(search).get('campaignId');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/campaign/${campaignId}`);
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, campaignId]);

  return (
    <div className="bg-green-100 min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful</h1>
      <p className="text-xl text-gray-700">Thank you for your donation of <strong>₹{amount}</strong> to campaign <strong>{campaignId}</strong>!</p>
      <p className="text-lg mt-4">You will be redirected to the campaign page shortly.</p>
      <div className="loader mt-6"></div>
    </div>
  );
};

export default PaymentSuccess;

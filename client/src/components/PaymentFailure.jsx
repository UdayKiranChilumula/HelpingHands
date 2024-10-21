import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFailure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(-1);  
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="bg-red-100 min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Failed</h1>
      <p className="text-xl text-gray-700">Your payment was not completed. Please try again.</p>
      <p className="text-lg mt-4">You will be redirected back to the campaign page shortly.</p>
      <div className="loader mt-6"></div>
    </div>
  );
};

export default PaymentFailure;

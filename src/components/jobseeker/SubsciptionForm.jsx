import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSubscription, verifyPayment } from '../../features/subscription/subscriptionSlice';
import { useNavigate } from 'react-router-dom';

const SubscriptionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order, status, error } = useSelector((state) => state.subscription);

  // Function to dynamically load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve(true);
      } else {
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error('Failed to load Razorpay script'));
        document.body.appendChild(script);
      }
    });
  };

  const handleSubscribe = async () => {
    try {
      const { order_id, amount, currency } = await dispatch(createSubscription()).unwrap();

      // Load Razorpay script if not already loaded
      await loadRazorpayScript();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        order_id,
        handler: async function (response) {
          // Ensure response contains the necessary fields
          console.log("Razorpay response:", response);
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          // Dispatch verifyPayment action
          console.log("Dispatching verifyPayment:", paymentData);

          await dispatch(verifyPayment(paymentData));
          // After successful payment verification, navigate to the payment success page
          navigate("/payment-success");
        },
        modal: {
          ondismiss: function() {
            console.log("Payment Modal dismissed.");
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-300 to-teal-700">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-4">Subscribe to Premium</h1>
        <p className="text-center text-gray-600 mb-6">
          Access exclusive features and elevate your experience.
        </p>
      <button
        onClick={handleSubscribe}
        className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-md text-lg font-semibold shadow-md hover:from-blue-600 hover:to-green-600 transition-transform transform hover:scale-105"
      >
        Pay ₹29.99
      </button>
      {status === 'failed' && (
        <p className="text-red-500 text-center mt-4">{error || 'Something went wrong'}</p>
      )}
      {status === 'completed' && (
        <p className="text-green-500 text-center mt-4">Payment Successful!</p>
      )}
    </div>
    </div>
  );
};

export default SubscriptionForm;

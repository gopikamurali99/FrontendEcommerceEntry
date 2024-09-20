import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CustomerVerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`${apiUrl}/customer/verify/${token}`);
        alert(response.data.message); // Show success message
        navigate('/customer/signin'); // Redirect to login page
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert('Verification failed. Please try again later.');
        }
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>Please wait while we verify your email...</p>
    </div>
  );
};

export default CustomerVerifyEmail;
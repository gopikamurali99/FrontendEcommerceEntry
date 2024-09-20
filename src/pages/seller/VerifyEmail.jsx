import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const VerifyEmailSeller = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const VerifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/seller/verify/${token}`);
        alert(response.data.message); // Show success message
        navigate('/adminlogin'); // Redirect to login page
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert('Verification failed. Please try again later.');
        }
      }
    };

    VerifyEmail();
  }, [token, navigate]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>Please wait while we verify your email...</p>
    </div>
  );
};

export default VerifyEmailSeller;
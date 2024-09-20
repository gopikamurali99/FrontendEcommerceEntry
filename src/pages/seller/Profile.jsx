// src/Pages/Profile.js

import React, { useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to update profile in backend
    console.log('Profile updated:', profile);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profile Management</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={profile.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={profile.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" name="phone" value={profile.phone} onChange={handleChange} required />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
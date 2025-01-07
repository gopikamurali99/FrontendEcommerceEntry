import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/footer';
const AboutUs = () => {
  return (
    <>
    
    <Navbar/>
    <div className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">Welcome to Vogue Vista!</h2>
          <p className="mt-4 text-xl text-gray-600">
            Fashion that speaks to your unique personality.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-semibold text-gray-800">Our Story</h3>
            <p className="mt-4 text-lg text-gray-600">
              Vogue Vista was born out of a passion for fashion and the desire to provide a seamless shopping experience for fashion-forward individuals. We understand that clothing is more than just fabric—it's an expression of who you are. Our team works tirelessly to handpick designs that suit various body types and make you feel fabulous inside and out.
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-semibold text-gray-800">What We Offer</h3>
            <ul className="mt-4 text-lg text-gray-600 space-y-4">
              <li>Trendy Collections</li>
              <li>Affordable Luxury</li>
              <li>Excellent Customer Service</li>
              <li>Sustainable Fashion</li>
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-3xl font-semibold text-center text-gray-800">Our Values</h3>
          <div className="mt-6 space-y-4 text-lg text-gray-600">
            <p><strong>Quality</strong>: Every item in our store is selected with care, ensuring it meets the highest standards.</p>
            <p><strong>Inclusivity</strong>: Fashion should be accessible to all. We embrace diversity and celebrate every body shape, size, and personality.</p>
            <p><strong>Sustainability</strong>: We care about the planet and strive to offer eco-conscious clothing lines.</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600">
            Join the Vogue Vista family and shop with confidence, knowing you are not only elevating your wardrobe but also supporting a brand that cares about the world around us.
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AboutUs;

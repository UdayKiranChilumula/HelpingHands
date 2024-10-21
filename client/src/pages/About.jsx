import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-400 to-blue-500 py-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">Empowering Communities, One Cause at a Time</h1>
          <p className="text-lg sm:text-xl lg:text-2xl">Join us in making a difference through crowdfunding for essential causes.</p>
        </div>
      </div>

      {/* Purpose Section */}
      <section className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Purpose</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At Helping Hands, we believe in the power of collective support. Our mission is to provide a platform where individuals can raise funds for important causes, from medical assistance to disaster relief. We aim to connect compassionate donors with those in need, fostering a community of generosity and kindness.
          </p>
        </div>
      </section>

      {/* Functionality Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Helping Hands offers an intuitive platform for creating and managing crowdfunding campaigns. Easily set your fundraising goal, share your story, and connect with a community of supporters who are eager to contribute to meaningful causes. Track your campaign's progress and receive real-time updates on donations.
            </p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We believe that together, we can make a significant impact. By joining Helping Hands, you become part of a caring community dedicated to helping others. Whether you’re a campaign creator or a donor, your contribution matters and helps change lives.
          </p>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Testimonials</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Hear from those who have benefitted from our platform and the generous supporters who have made a difference. Together, we share stories of hope, resilience, and community spirit.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

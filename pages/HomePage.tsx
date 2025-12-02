
import React from 'react';
import { Link } from 'react-router-dom';
import { RocketLaunchIcon, DocumentTextIcon, PhotoIcon } from '@heroicons/react/24/outline';

const HomePage: React.FC = () => {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
        AI-Powered Affiliate Marketing Posts
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
        Turn any product into a high-converting, SEO-optimized landing page in minutes. Ready to deploy, no coding required.
      </p>
      <Link
        to="/create"
        className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105"
      >
        Create Your First Post Now
      </Link>

      <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
        <div className="bg-gray-800 p-6 rounded-lg">
          <RocketLaunchIcon className="h-10 w-10 text-green-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Instant Generation</h3>
          <p className="text-gray-400">Go from product idea to a complete promotional page with text and images in under a minute.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <DocumentTextIcon className="h-10 w-10 text-green-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Persuasive Copywriting</h3>
          <p className="text-gray-400">Leverage powerful AI to write engaging, marketing-focused copy that drives clicks and conversions.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <PhotoIcon className="h-10 w-10 text-green-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Unique AI Images</h3>
          <p className="text-gray-400">Generate custom, royalty-free images for your hero section, features, and call-to-action banners.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

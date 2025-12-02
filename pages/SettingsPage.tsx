
import React from 'react';

const SettingsPage: React.FC = () => {
  // FIX: All state and handlers for API key management have been removed
  // to align with the guideline of not having UI for API keys.

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">API Configuration</h2>
          <p className="text-gray-300">
            This application is configured to use the Gemini API. The API key is managed via environment variables and does not need to be configured here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

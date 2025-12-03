import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">API Configuration</h2>
          <p className="text-gray-300">
            This application is configured to use the Gemini API. The API key is managed via environment variables and does not need to be configured here.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-4">How to Configure Your API Key on Vercel</h2>
          <div className="text-gray-300 space-y-4">
            <p>To use this application, you must provide your own Google Gemini API key. Follow these steps to set it up in your Vercel project:</p>
            <ol className="list-decimal list-inside space-y-2 bg-gray-900/50 p-4 rounded-md border border-gray-700">
              <li>Navigate to your project's dashboard on the Vercel website.</li>
              <li>Click on the <span className="font-mono bg-gray-700 px-1 rounded">Settings</span> tab.</li>
              <li>In the left sidebar, select <span className="font-mono bg-gray-700 px-1 rounded">Environment Variables</span>.</li>
              <li>
                Create a new variable with the following details:
                <ul className="list-disc list-inside ml-6 mt-2 text-gray-400">
                  <li><strong>Name:</strong> <code className="font-mono bg-gray-700 text-teal-300 px-1.5 py-0.5 rounded">API_KEY</code></li>
                  <li><strong>Value:</strong> Paste your Google Gemini API key here.</li>
                </ul>
              </li>
              <li>Ensure the variable is available for all environments (Production, Preview, and Development).</li>
              <li>Click <span className="font-mono bg-gray-700 px-1 rounded">Save</span>.</li>
              <li>
                <strong>Important:</strong> You must redeploy your application for the new environment variable to take effect. Go to the <span className="font-mono bg-gray-700 px-1 rounded">Deployments</span> tab and trigger a new deployment.
              </li>
            </ol>
             <p className="text-sm text-gray-400 pt-2">
              If you encounter API key errors, please double-check that the name is exactly <code className="font-mono text-teal-300">API_KEY</code> and that you have redeployed your project after saving the key.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;

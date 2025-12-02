
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { PostsProvider } from './context/PostsContext';
import { GenerateProvider } from './components/GenerateProvider';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import MyPostsPage from './pages/MyPostsPage';
import SettingsPage from './pages/SettingsPage';

const App: React.FC = () => {
  return (
    <PostsProvider>
      <HashRouter>
        <GenerateProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/my-posts" element={<MyPostsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </Layout>
        </GenerateProvider>
      </HashRouter>
    </PostsProvider>
  );
};

export default App;

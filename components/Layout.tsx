
import React, { ReactNode } from 'react';
import HeaderAsSidebar from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <HeaderAsSidebar />
      <div className="flex-1 ml-64">
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

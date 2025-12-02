
// app/layout.tsx
// FIX: Added missing React import.
import React from 'react';
import './globals.css';
import Link from 'next/link';
import { HomeIcon, CreateIcon, PostsIcon, SettingsIcon } from '@/components/Icons';

export const metadata = {
  title: 'AffiliateFlow',
  description: 'AI-Powered Affiliate Blog Post Generator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Create Post', href: '/create', icon: CreateIcon },
    { name: 'My Posts', href: '/my-posts', icon: PostsIcon },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
  ];

  return (
    <html lang="en">
      <body className="bg-gray-900 text-white min-h-screen flex">
        {/* سایدبار چپ */}
        <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-cyan-400">AffiliateFlow</h1>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  <Icon />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
          <div className="p-4 text-xs text-gray-500 border-t border-gray-700">
            © 2025 AffiliateFlow
          </div>
        </aside>

        {/* محتوای اصلی */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </body>
    </html>
  );
}

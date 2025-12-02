
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { GeneratedPost } from '../types';

interface PostsContextType {
  posts: GeneratedPost[];
  addPost: (post: GeneratedPost) => void;
  deletePost: (id: string) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<GeneratedPost[]>(() => {
    try {
      const savedPosts = localStorage.getItem('affiliate_posts');
      return savedPosts ? JSON.parse(savedPosts) : [];
    } catch (error) {
      console.error("Failed to parse posts from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('affiliate_posts', JSON.stringify(posts));
    } catch (error) {
      console.error("Failed to save posts to localStorage", error);
    }
  }, [posts]);

  const addPost = (post: GeneratedPost) => {
    setPosts(prevPosts => [post, ...prevPosts]);
  };

  const deletePost = (id: string) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, deletePost }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = (): PostsContextType => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};

import React from 'react';
import { Post } from './Post';
import { CreatePost } from './CreatePost';
import { TrendingUp, Users, MessageSquare } from 'lucide-react';

const SAMPLE_POSTS = [
  {
    username: 'Sarah Johnson',
    timestamp: '2 hours ago',
    content: 'Just discovered an amazing new feature in the latest update! Has anyone else tried it out yet? The productivity boost is incredible! 🚀',
    upvotes: 42,
    comments: 12,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    username: 'Alex Chen',
    timestamp: '4 hours ago',
    content: 'Looking for recommendations on the best practices for implementing authentication in a React application. Any suggestions from the community?',
    upvotes: 28,
    comments: 15,
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop'
  }
];

export function CommunityFeed() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Community Feed</h1>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
            <TrendingUp className="w-5 h-5" />
            <span>Trending</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
            <Users className="w-5 h-5" />
            <span>Following</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
            <MessageSquare className="w-5 h-5" />
            <span>Recent</span>
          </button>
        </div>
      </div>

      <CreatePost />
      
      <div className="space-y-4">
        {SAMPLE_POSTS.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </div>
    </div>
  );
}
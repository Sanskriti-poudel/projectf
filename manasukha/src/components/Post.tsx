import React from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, Share2 } from 'lucide-react';

interface PostProps {
  username: string;
  timestamp: string;
  content: string;
  upvotes: number;
  comments: number;
  avatar?: string;
}

export function Post({ username, timestamp, content, upvotes, comments, avatar }: PostProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-3">
        <img
          src={avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"}
          alt={username}
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{username}</h3>
          <p className="text-sm text-gray-500">{timestamp}</p>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">{content}</p>
      
      <div className="flex items-center justify-between text-gray-500">
        <div className="flex space-x-4">
          <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
            <ThumbsUp className="w-5 h-5" />
            <span>{upvotes}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-red-600 transition-colors">
            <ThumbsDown className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex space-x-4">
          <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span>{comments}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-green-600 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
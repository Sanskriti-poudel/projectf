import React, { useState } from 'react';
import { Send, Image, Link } from 'lucide-react';

export function CreatePost() {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle post creation here
    setContent('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[120px]"
        />
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex space-x-2">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Image className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Link className="w-5 h-5" />
            </button>
          </div>
          
          <button
            type="submit"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Post</span>
          </button>
        </div>
      </form>
    </div>
  );
}
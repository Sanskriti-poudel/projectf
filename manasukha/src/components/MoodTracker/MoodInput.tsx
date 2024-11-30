import React, { useState } from 'react';
import { SmilePlus, Pencil, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const MOOD_EMOJIS = [
  { emoji: '😢', label: 'Sad', color: 'bg-blue-100' },
  { emoji: '😕', label: 'Down', color: 'bg-indigo-100' },
  { emoji: '😐', label: 'Neutral', color: 'bg-gray-100' },
  { emoji: '🙂', label: 'Good', color: 'bg-yellow-100' },
  { emoji: '😊', label: 'Great', color: 'bg-green-100' }
];

const ACTIVITIES = [
  'Exercise', 'Meditation', 'Reading', 'Social', 'Work', 'Rest', 'Therapy', 'Nature'
];

export function MoodInput() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const handleActivityToggle = (activity: string) => {
    setSelectedActivities(prev => 
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ mood: selectedMood, notes, activities: selectedActivities });
    setSelectedMood(null);
    setNotes('');
    setSelectedActivities([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center mb-6">
        <div className="bg-teal-100 p-3 rounded-full mr-3">
          <SmilePlus className="w-6 h-6 text-teal-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">How are you feeling today?</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-5 gap-4">
          {MOOD_EMOJIS.map((mood, index) => (
            <motion.button
              key={index}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(index + 1)}
              className={`flex flex-col items-center p-4 rounded-lg transition-all
                ${selectedMood === index + 1 ? `${mood.color} ring-2 ring-teal-500` : 'hover:bg-gray-50'}`}
            >
              <span className="text-3xl mb-2">{mood.emoji}</span>
              <span className="text-sm text-gray-600">{mood.label}</span>
            </motion.button>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-gray-700 mb-2">
            <Activity className="w-5 h-5 mr-2" />
            <h3 className="font-medium">Activities Today</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {ACTIVITIES.map(activity => (
              <motion.button
                key={activity}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleActivityToggle(activity)}
                className={`px-4 py-2 rounded-full text-sm transition-colors
                  ${selectedActivities.includes(activity)
                    ? 'bg-teal-100 text-teal-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {activity}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-gray-700 mb-2">
            <Pencil className="w-5 h-5 mr-2" />
            <h3 className="font-medium">Add Notes</h3>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How are you feeling? What's on your mind?"
            className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none h-32"
          />
        </div>

        <motion.button
          type="submit"
          disabled={selectedMood === null}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 
            transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed
            font-medium text-lg shadow-md"
        >
          Save Entry
        </motion.button>
      </form>
    </motion.div>
  );
}
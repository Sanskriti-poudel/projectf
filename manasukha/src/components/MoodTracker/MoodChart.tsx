import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import type { MoodData } from '../../types/mood';

interface MoodChartProps {
  data: MoodData[];
}

const MOOD_LABELS = ['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy'];

export function MoodChart({ data }: MoodChartProps) {
  const averageMood = data.reduce((acc, curr) => acc + curr.value, 0) / data.length;
  const moodTrend = averageMood > 3 ? 'positive' : averageMood < 3 ? 'negative' : 'neutral';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-purple-100 p-3 rounded-full mr-3">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Mood History</h2>
        </div>
        <div className="text-sm text-gray-500">
          Last {data.length} days
        </div>
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#0d9488"
              strokeWidth={3}
              dot={{ fill: '#0d9488', strokeWidth: 2 }}
              activeDot={{ r: 8, fill: '#0d9488' }}
            />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => format(new Date(date), 'MMM d')}
              stroke="#6b7280"
            />
            <YAxis 
              domain={[1, 5]} 
              ticks={[1, 2, 3, 4, 5]}
              tickFormatter={(value) => MOOD_LABELS[value - 1]}
              stroke="#6b7280"
            />
            <Tooltip 
              labelFormatter={(date) => format(new Date(date), 'MMMM d, yyyy')}
              formatter={(value: number) => [MOOD_LABELS[value - 1], 'Mood']}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Mood Insights</h3>
        <p className="text-gray-700">
          Your mood has been generally
          <span className={`font-medium mx-1
            ${moodTrend === 'positive' ? 'text-green-600' : 
              moodTrend === 'negative' ? 'text-red-600' : 
              'text-yellow-600'}`}>
            {moodTrend}
          </span>
          over this period.
        </p>
      </div>
    </motion.div>
  );
}
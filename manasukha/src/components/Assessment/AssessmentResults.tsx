import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import type { AssessmentResult } from '../../types/assessment';

interface AssessmentResultsProps {
  gad7Results: AssessmentResult[];
  phq9Results: AssessmentResult[];
}

export function AssessmentResults({ gad7Results, phq9Results }: AssessmentResultsProps) {
  const combinedData = gad7Results.map((gad7, index) => ({
    date: new Date(gad7.date).toLocaleDateString(),
    'Anxiety (GAD-7)': gad7.score,
    'Depression (PHQ-9)': phq9Results[index]?.score || 0
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Assessment History</h2>

      <div className="h-80 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar dataKey="Anxiety (GAD-7)" fill="#0d9488" />
            <Bar dataKey="Depression (PHQ-9)" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-teal-50 p-4 rounded-lg">
          <h3 className="font-semibold text-teal-800 mb-2">Latest GAD-7 Result</h3>
          {gad7Results.length > 0 ? (
            <>
              <p className="text-2xl font-bold text-teal-600 mb-1">
                Score: {gad7Results[gad7Results.length - 1].score}
              </p>
              <p className="text-sm text-teal-700">
                {gad7Results[gad7Results.length - 1].severity}
              </p>
            </>
          ) : (
            <p className="text-sm text-teal-700">No assessment taken yet</p>
          )}
        </div>

        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="font-semibold text-indigo-800 mb-2">Latest PHQ-9 Result</h3>
          {phq9Results.length > 0 ? (
            <>
              <p className="text-2xl font-bold text-indigo-600 mb-1">
                Score: {phq9Results[phq9Results.length - 1].score}
              </p>
              <p className="text-sm text-indigo-700">
                {phq9Results[phq9Results.length - 1].severity}
              </p>
            </>
          ) : (
            <p className="text-sm text-indigo-700">No assessment taken yet</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
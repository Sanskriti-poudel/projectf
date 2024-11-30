import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import type { AssessmentQuestion, AssessmentType } from '../../types/assessment';

interface AssessmentFormProps {
  type: AssessmentType;
  questions: AssessmentQuestion[];
  onComplete: (score: number) => void;
}

export function AssessmentForm({ type, questions, onComplete }: AssessmentFormProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: value }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0) + value;
      onComplete(totalScore);
    }
  };

  const question = questions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {type === 'GAD7' ? 'Anxiety Assessment (GAD-7)' : 'Depression Assessment (PHQ-9)'}
        </h2>
        <p className="text-gray-600">
          Over the last 2 weeks, how often have you been bothered by the following problems?
        </p>
      </div>

      <motion.div
        key={question.id}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -50, opacity: 0 }}
        className="mb-8"
      >
        <div className="flex items-start mb-4">
          {question.id === 9 && type === 'PHQ9' && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg flex items-center mb-4">
              <AlertTriangle className="w-5 h-5 mr-2" />
              <span className="text-sm">
                If you're having thoughts of hurting yourself, please reach out for help immediately.
                Contact emergency services or a mental health crisis hotline.
              </span>
            </div>
          )}
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            {question.text}
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {question.options.map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(option.value)}
              className="p-4 text-left rounded-lg border border-gray-200 hover:border-teal-500 
                hover:bg-teal-50 transition-all duration-200"
            >
              <span className="font-medium text-gray-700">{option.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal-500 transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardCheck } from 'lucide-react';
import { AssessmentForm } from './AssessmentForm';
import { AssessmentResults } from './AssessmentResults';
import { GAD7_QUESTIONS, PHQ9_QUESTIONS, getGAD7Severity, getPHQ9Severity } from '../../data/assessments';
import type { AssessmentType, AssessmentResult, UserAssessments } from '../../types/assessment';

interface AssessmentHubProps {
  onAssessmentComplete: () => void;
}

export function AssessmentHub({ onAssessmentComplete }: AssessmentHubProps) {
  const [currentAssessment, setCurrentAssessment] = useState<AssessmentType | null>(null);
  const [assessments, setAssessments] = useState<UserAssessments>({
    gad7Results: [],
    phq9Results: []
  });

  const handleAssessmentComplete = (score: number) => {
    const date = new Date().toISOString();
    const newResult: AssessmentResult = {
      type: currentAssessment!,
      score,
      date,
      severity: currentAssessment === 'GAD7' ? getGAD7Severity(score) : getPHQ9Severity(score)
    };

    setAssessments(prev => ({
      ...prev,
      [currentAssessment === 'GAD7' ? 'gad7Results' : 'phq9Results']: [
        ...prev[currentAssessment === 'GAD7' ? 'gad7Results' : 'phq9Results'],
        newResult
      ],
      lastAssessmentDate: date
    }));

    setCurrentAssessment(null);
    
    if (assessments.gad7Results.length > 0 && assessments.phq9Results.length > 0) {
      onAssessmentComplete();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        {!currentAssessment ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Mental Health Assessment</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Complete both assessments to access the full platform. Your responses help us provide
                better support and track your progress over time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentAssessment('GAD7')}
                className={`p-6 rounded-lg border-2 text-left transition-all
                  ${assessments.gad7Results.length > 0
                    ? 'border-green-500 bg-green-50'
                    : 'border-teal-200 hover:border-teal-500 hover:bg-teal-50'}`}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-teal-100 p-3 rounded-full mr-4">
                    <ClipboardCheck className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">GAD-7 Assessment</h3>
                    <p className="text-sm text-gray-600">Anxiety screening questionnaire</p>
                  </div>
                </div>
                {assessments.gad7Results.length > 0 && (
                  <div className="text-sm text-green-600">✓ Completed</div>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentAssessment('PHQ9')}
                className={`p-6 rounded-lg border-2 text-left transition-all
                  ${assessments.phq9Results.length > 0
                    ? 'border-green-500 bg-green-50'
                    : 'border-indigo-200 hover:border-indigo-500 hover:bg-indigo-50'}`}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <ClipboardCheck className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">PHQ-9 Assessment</h3>
                    <p className="text-sm text-gray-600">Depression screening questionnaire</p>
                  </div>
                </div>
                {assessments.phq9Results.length > 0 && (
                  <div className="text-sm text-green-600">✓ Completed</div>
                )}
              </motion.button>
            </div>

            {(assessments.gad7Results.length > 0 || assessments.phq9Results.length > 0) && (
              <AssessmentResults
                gad7Results={assessments.gad7Results}
                phq9Results={assessments.phq9Results}
              />
            )}
          </motion.div>
        ) : (
          <AssessmentForm
            type={currentAssessment}
            questions={currentAssessment === 'GAD7' ? GAD7_QUESTIONS : PHQ9_QUESTIONS}
            onComplete={handleAssessmentComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
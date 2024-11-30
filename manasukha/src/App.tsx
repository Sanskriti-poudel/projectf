import React, { useState } from 'react';
import { WelcomeCard } from './components/Dashboard/WelcomeCard';
import { QuickActions } from './components/Dashboard/QuickActions';
import { MoodInput } from './components/MoodTracker/MoodInput';
import { MoodChart } from './components/MoodTracker/MoodChart';
import { AssessmentHub} from './components/Assessment/AssessmentHub';


const sampleMoodData = [
  { date: '2024-03-01', value: 3 },
  { date: '2024-03-02', value: 4 },
  { date: '2024-03-03', value: 2 },
  { date: '2024-03-04', value: 5 },
  { date: '2024-03-05', value: 4 },
];

function App() {
  const [hasCompletedAssessments, setHasCompletedAssessments] = useState(false);

  if (!hasCompletedAssessments) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <h1 className="text-2xl font-bold text-teal-600">Manasukha</h1>
          </div>
        </nav>
        <AssessmentHub onAssessmentComplete={() => setHasCompletedAssessments(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <h1 className="text-2xl font-bold text-teal-600">Manasukha</h1>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <WelcomeCard username="Sarah" />
        <QuickActions />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <MoodInput />
          <MoodChart data={sampleMoodData} />
        </div>
      </main>
    </div>
  );
}

export default App;
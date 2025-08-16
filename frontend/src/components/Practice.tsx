/**
 * Practice Component - Interactive learning exercises
 * 
 * Features:
 * - AI-related practice exercises
 * - Progress tracking
 * - Different difficulty levels
 * - Fun and engaging design
 */

import React from 'react';

interface PracticeProps {
  className?: string;
}

interface PracticeExercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  points: number;
  completed: boolean;
  icon: string;
  color: 'green' | 'blue' | 'purple' | 'yellow' | 'red';
}

const practiceExercises: PracticeExercise[] = [
  {
    id: '1',
    title: 'AI Basics Quiz',
    description: 'Test your knowledge of fundamental AI concepts',
    difficulty: 'Beginner',
    points: 50,
    completed: false,
    icon: '🧠',
    color: 'green'
  },
  {
    id: '2',
    title: 'Identify AI Applications',
    description: 'Match AI technologies with real-world applications',
    difficulty: 'Beginner',
    points: 75,
    completed: true,
    icon: '🎯',
    color: 'blue'
  },
  {
    id: '3',
    title: 'AI Ethics Challenge',
    description: 'Explore ethical considerations in AI development',
    difficulty: 'Intermediate',
    points: 100,
    completed: false,
    icon: '⚖️',
    color: 'purple'
  },
  {
    id: '4',
    title: 'Future of AI',
    description: 'Predict and discuss AI trends and possibilities',
    difficulty: 'Advanced',
    points: 150,
    completed: false,
    icon: '🚀',
    color: 'yellow'
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'bg-slate-700 text-teal-300 border-slate-600';
    case 'Intermediate': return 'bg-slate-700 text-blue-300 border-slate-600';
    case 'Advanced': return 'bg-slate-700 text-purple-300 border-slate-600';
    default: return 'bg-slate-700 text-gray-300 border-slate-600';
  }
};

const getCardColor = (color: string) => {
  switch (color) {
    case 'green': return 'border-slate-600 hover:border-teal-500 bg-slate-800';
    case 'blue': return 'border-slate-600 hover:border-blue-500 bg-slate-800';
    case 'purple': return 'border-slate-600 hover:border-purple-500 bg-slate-800';
    case 'yellow': return 'border-slate-600 hover:border-yellow-500 bg-slate-800';
    case 'red': return 'border-slate-600 hover:border-red-500 bg-slate-800';
    default: return 'border-slate-600 hover:border-gray-500 bg-slate-800';
  }
};

export const Practice: React.FC<PracticeProps> = ({ className = '' }) => {
  const handleStartPractice = (exerciseId: string) => {
    console.log('Starting practice exercise:', exerciseId);
    alert(`🎯 Starting practice exercise ${exerciseId}!\n\nThis feature will be implemented soon.`);
  };

  const completedCount = practiceExercises.filter(ex => ex.completed).length;
  const totalPoints = practiceExercises.filter(ex => ex.completed).reduce((sum, ex) => sum + ex.points, 0);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-black text-white mb-4">
          🎯 Practice Zone
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto font-medium">
          Sharpen your AI knowledge with fun, interactive exercises! 🚀
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
        <div className="bg-slate-800 border-2 border-teal-500 rounded-2xl p-6 text-center">
          <div className="text-teal-400 font-black text-3xl mb-2">{completedCount}</div>
          <div className="text-teal-300 font-semibold">Completed</div>
        </div>
        <div className="bg-slate-800 border-2 border-blue-500 rounded-2xl p-6 text-center">
          <div className="text-blue-400 font-black text-3xl mb-2">{totalPoints}</div>
          <div className="text-blue-300 font-semibold">Points Earned</div>
        </div>
        <div className="bg-slate-800 border-2 border-purple-500 rounded-2xl p-6 text-center">
          <div className="text-purple-400 font-black text-3xl mb-2">{practiceExercises.length}</div>
          <div className="text-purple-300 font-semibold">Total Exercises</div>
        </div>
      </div>

      {/* Practice Exercises */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-black text-white mb-6 text-center">
          Available Exercises
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {practiceExercises.map((exercise) => (
            <div
              key={exercise.id}
              className={`
                border-2 rounded-3xl p-6 transition-all duration-200 
                transform hover:scale-105 hover:shadow-lg cursor-pointer
                ${getCardColor(exercise.color)}
                ${exercise.completed ? 'opacity-75' : ''}
              `}
              onClick={() => !exercise.completed && handleStartPractice(exercise.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{exercise.icon}</div>
                <div className={`px-3 py-1 rounded-full text-sm font-bold border ${getDifficultyColor(exercise.difficulty)}`}>
                  {exercise.difficulty}
                </div>
              </div>
              
              <h3 className="text-xl font-black text-white mb-2">
                {exercise.title}
                {exercise.completed && <span className="ml-2 text-teal-400">✓</span>}
              </h3>
              
              <p className="text-gray-400 font-medium mb-4">
                {exercise.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="text-yellow-400 font-bold">
                  🪙 {exercise.points} points
                </div>
                <button 
                  className={`
                    px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200
                    ${exercise.completed 
                      ? 'bg-slate-700 text-gray-500 cursor-not-allowed' 
                      : 'bg-teal-500 hover:bg-teal-600 text-white hover:scale-105'
                    }
                  `}
                  disabled={exercise.completed}
                >
                  {exercise.completed ? 'Completed' : 'Start Practice'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

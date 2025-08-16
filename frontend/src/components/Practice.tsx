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
    case 'Beginner': return 'bg-duogreen-100 text-duogreen-800 border-duogreen-300';
    case 'Intermediate': return 'bg-duoblue-100 text-duoblue-800 border-duoblue-300';
    case 'Advanced': return 'bg-duopurple-100 text-duopurple-800 border-duopurple-300';
    default: return 'bg-duogray-100 text-duogray-800 border-duogray-300';
  }
};

const getCardColor = (color: string) => {
  switch (color) {
    case 'green': return 'border-duogreen-200 hover:border-duogreen-300 bg-duogreen-50';
    case 'blue': return 'border-duoblue-200 hover:border-duoblue-300 bg-duoblue-50';
    case 'purple': return 'border-duopurple-200 hover:border-duopurple-300 bg-duopurple-50';
    case 'yellow': return 'border-duoyellow-200 hover:border-duoyellow-300 bg-duoyellow-50';
    case 'red': return 'border-duored-200 hover:border-duored-300 bg-duored-50';
    default: return 'border-duogray-200 hover:border-duogray-300 bg-duogray-50';
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
        <h1 className="text-4xl font-black text-duogray-800 mb-4">
          🎯 Practice Zone
        </h1>
        <p className="text-lg text-duogray-600 max-w-2xl mx-auto font-medium">
          Sharpen your AI knowledge with fun, interactive exercises! 🚀
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
        <div className="bg-duogreen-50 border-2 border-duogreen-200 rounded-2xl p-6 text-center">
          <div className="text-duogreen-600 font-black text-3xl mb-2">{completedCount}</div>
          <div className="text-duogreen-700 font-semibold">Completed</div>
        </div>
        <div className="bg-duoblue-50 border-2 border-duoblue-200 rounded-2xl p-6 text-center">
          <div className="text-duoblue-600 font-black text-3xl mb-2">{totalPoints}</div>
          <div className="text-duoblue-700 font-semibold">Points Earned</div>
        </div>
        <div className="bg-duopurple-50 border-2 border-duopurple-200 rounded-2xl p-6 text-center">
          <div className="text-duopurple-600 font-black text-3xl mb-2">{practiceExercises.length}</div>
          <div className="text-duopurple-700 font-semibold">Total Exercises</div>
        </div>
      </div>

      {/* Practice Exercises */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-black text-duogray-800 mb-6 text-center">
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
              
              <h3 className="text-xl font-black text-duogray-800 mb-2">
                {exercise.title}
                {exercise.completed && <span className="ml-2 text-duogreen-600">✓</span>}
              </h3>
              
              <p className="text-duogray-600 font-medium mb-4">
                {exercise.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="text-duoyellow-600 font-bold">
                  🪙 {exercise.points} points
                </div>
                <button 
                  className={`
                    px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200
                    ${exercise.completed 
                      ? 'bg-duogray-200 text-duogray-600 cursor-not-allowed' 
                      : 'bg-duogreen-500 hover:bg-duogreen-600 text-white hover:scale-105'
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

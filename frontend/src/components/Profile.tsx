/**
 * Profile Component - User profile and achievements
 * 
 * Features:
 * - User statistics and progress
 * - Achievement badges
 * - Learning history
 * - Personal goals and streaks
 */

import React, { useState } from 'react';

interface ProfileProps {
  className?: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  target?: number;
}

interface LearningStats {
  totalPoints: number;
  currentLevel: number;
  currentStreak: number;
  longestStreak: number;
  totalLessons: number;
  totalTimeSpent: number; // in minutes
  joinDate: string;
}

const achievements: Achievement[] = [
  {
    id: '1',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '👶',
    earned: true,
    earnedDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Streak Master',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    earned: true,
    earnedDate: '2024-01-22'
  },
  {
    id: '3',
    name: 'Knowledge Seeker',
    description: 'Complete 10 lessons',
    icon: '🧠',
    earned: true,
    earnedDate: '2024-01-28'
  },
  {
    id: '4',
    name: 'Lightning Fast',
    description: 'Complete a lesson in under 2 minutes',
    icon: '⚡',
    earned: true,
    earnedDate: '2024-02-01'
  },
  {
    id: '5',
    name: 'Perfect Score',
    description: 'Get 100% on 5 consecutive lessons',
    icon: '🎯',
    earned: false,
    progress: 3,
    target: 5
  },
  {
    id: '6',
    name: 'Night Owl',
    description: 'Complete lessons after 10 PM',
    icon: '🦉',
    earned: false,
    progress: 2,
    target: 10
  },
  {
    id: '7',
    name: 'Marathon Runner',
    description: 'Maintain a 30-day streak',
    icon: '🏃',
    earned: false,
    progress: 4,
    target: 30
  },
  {
    id: '8',
    name: 'AI Expert',
    description: 'Master all AI fundamentals',
    icon: '🤖',
    earned: false,
    progress: 15,
    target: 50
  }
];

const userStats: LearningStats = {
  totalPoints: 1890,
  currentLevel: 8,
  currentStreak: 4,
  longestStreak: 12,
  totalLessons: 23,
  totalTimeSpent: 420, // 7 hours
  joinDate: '2024-01-10'
};

const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  return `${hours}h ${mins}m`;
};

const getDaysAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return months === 1 ? '1 month ago' : `${months} months ago`;
  }
  const years = Math.floor(diffDays / 365);
  return years === 1 ? '1 year ago' : `${years} years ago`;
};

const getLevelProgress = (level: number, points: number): number => {
  const pointsForCurrentLevel = level * 250;
  const pointsForNextLevel = (level + 1) * 250;
  const progressInLevel = points - pointsForCurrentLevel;
  const pointsNeededForLevel = pointsForNextLevel - pointsForCurrentLevel;
  return Math.max(0, Math.min(100, (progressInLevel / pointsNeededForLevel) * 100));
};

export const Profile: React.FC<ProfileProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements' | 'history'>('stats');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <div className="text-8xl mb-4">🙋‍♂️</div>
        <h1 className="text-4xl font-black text-duogray-800 mb-2">
          Your Profile
        </h1>
        <p className="text-lg text-duogray-600 font-medium">
          Track your AI learning journey! 📈
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-duogreen-100 to-duogreen-200 rounded-2xl p-4 text-center">
          <div className="text-3xl font-black text-duogreen-800">{userStats.totalPoints}</div>
          <div className="text-sm font-bold text-duogreen-700">Total Points</div>
        </div>
        <div className="bg-gradient-to-br from-duoblue-100 to-duoblue-200 rounded-2xl p-4 text-center">
          <div className="text-3xl font-black text-duoblue-800">{userStats.currentLevel}</div>
          <div className="text-sm font-bold text-duoblue-700">Current Level</div>
        </div>
        <div className="bg-gradient-to-br from-duoyellow-100 to-duoyellow-200 rounded-2xl p-4 text-center">
          <div className="text-3xl font-black text-duoyellow-800">{userStats.currentStreak}</div>
          <div className="text-sm font-bold text-duoyellow-700">Day Streak</div>
        </div>
        <div className="bg-gradient-to-br from-duopurple-100 to-duopurple-200 rounded-2xl p-4 text-center">
          <div className="text-3xl font-black text-duopurple-800">{userStats.totalLessons}</div>
          <div className="text-sm font-bold text-duopurple-700">Lessons Done</div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border-2 border-duogray-200 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-black text-duogray-800">Level Progress</h3>
            <div className="text-sm font-bold text-duogray-600">
              Level {userStats.currentLevel} → {userStats.currentLevel + 1}
            </div>
          </div>
          <div className="w-full bg-duogray-200 rounded-full h-4 mb-2">
            <div 
              className="bg-gradient-to-r from-duogreen-500 to-duoblue-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${getLevelProgress(userStats.currentLevel, userStats.totalPoints)}%` }}
            ></div>
          </div>
          <div className="text-sm text-duogray-600 text-center">
            {Math.floor((userStats.currentLevel + 1) * 250 - userStats.totalPoints)} points to next level
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="bg-duogray-100 rounded-2xl p-1 flex">
            {(['stats', 'achievements', 'history'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-6 py-2 rounded-xl font-bold text-sm transition-all duration-200 capitalize
                  ${activeTab === tab
                    ? 'bg-duogreen-500 text-white shadow-lg'
                    : 'text-duogray-600 hover:text-duogray-800'
                  }
                `}
              >
                {tab === 'stats' ? '📊 Stats' : 
                 tab === 'achievements' ? '🏆 Achievements' : 
                 '📚 History'}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'stats' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-duogray-200 rounded-3xl p-6">
              <h3 className="text-xl font-black text-duogray-800 mb-4">📈 Learning Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-duogray-600">Time Spent Learning</span>
                  <span className="font-bold">{formatTime(userStats.totalTimeSpent)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-duogray-600">Longest Streak</span>
                  <span className="font-bold">{userStats.longestStreak} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-duogray-600">Average Score</span>
                  <span className="font-bold">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-duogray-600">Favorite Time</span>
                  <span className="font-bold">7:00 PM</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white border-2 border-duogray-200 rounded-3xl p-6">
              <h3 className="text-xl font-black text-duogray-800 mb-4">🎯 Goals</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-duogray-600">Daily Goal</span>
                    <span className="font-bold text-duogreen-600">3/3 lessons</span>
                  </div>
                  <div className="w-full bg-duogray-200 rounded-full h-2">
                    <div className="bg-duogreen-500 h-2 rounded-full w-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-duogray-600">Weekly Goal</span>
                    <span className="font-bold text-duoblue-600">18/21 lessons</span>
                  </div>
                  <div className="w-full bg-duogray-200 rounded-full h-2">
                    <div className="bg-duoblue-500 h-2 rounded-full" style={{width: '86%'}}></div>
                  </div>
                </div>
                <div className="text-sm text-duogray-600 mt-4">
                  Member since {getDaysAgo(userStats.joinDate)}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`
                  border-2 rounded-3xl p-4 transition-all duration-200
                  ${achievement.earned
                    ? 'bg-gradient-to-br from-duoyellow-50 to-duoyellow-100 border-duoyellow-300'
                    : 'bg-duogray-50 border-duogray-200'
                  }
                `}
              >
                <div className="flex items-start space-x-4">
                  <div className={`
                    text-4xl p-2 rounded-2xl
                    ${achievement.earned ? 'bg-duoyellow-200' : 'bg-duogray-200 grayscale'}
                  `}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-black ${achievement.earned ? 'text-duoyellow-800' : 'text-duogray-600'}`}>
                      {achievement.name}
                    </h4>
                    <p className="text-sm text-duogray-600 mb-2">{achievement.description}</p>
                    
                    {achievement.earned ? (
                      <div className="text-xs text-duoyellow-700 font-bold">
                        ✅ Earned {getDaysAgo(achievement.earnedDate!)}
                      </div>
                    ) : achievement.progress !== undefined ? (
                      <div>
                        <div className="text-xs text-duogray-600 mb-1">
                          Progress: {achievement.progress}/{achievement.target}
                        </div>
                        <div className="w-full bg-duogray-200 rounded-full h-2">
                          <div 
                            className="bg-duogreen-500 h-2 rounded-full"
                            style={{ width: `${(achievement.progress! / achievement.target!) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-duogray-500">🔒 Locked</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border-2 border-duogray-200 rounded-3xl p-6">
              <h3 className="text-xl font-black text-duogray-800 mb-6">📚 Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-duogreen-50 rounded-2xl">
                  <div className="text-2xl">✅</div>
                  <div className="flex-1">
                    <div className="font-bold text-duogray-800">Completed: Neural Networks Basics</div>
                    <div className="text-sm text-duogray-600">Score: 95% • 2 hours ago</div>
                  </div>
                  <div className="text-duogreen-600 font-bold">+50 XP</div>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-duoblue-50 rounded-2xl">
                  <div className="text-2xl">🎯</div>
                  <div className="flex-1">
                    <div className="font-bold text-duogray-800">Daily Goal Achieved!</div>
                    <div className="text-sm text-duogray-600">Completed 3 lessons today</div>
                  </div>
                  <div className="text-duoblue-600 font-bold">+25 XP</div>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-duopurple-50 rounded-2xl">
                  <div className="text-2xl">⚡</div>
                  <div className="flex-1">
                    <div className="font-bold text-duogray-800">Speed Bonus!</div>
                    <div className="text-sm text-duogray-600">Completed lesson in 1:45 minutes</div>
                  </div>
                  <div className="text-duopurple-600 font-bold">+15 XP</div>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-duoyellow-50 rounded-2xl">
                  <div className="text-2xl">🏆</div>
                  <div className="flex-1">
                    <div className="font-bold text-duogray-800">New Achievement!</div>
                    <div className="text-sm text-duogray-600">Earned "Lightning Fast" badge</div>
                  </div>
                  <div className="text-duoyellow-600 font-bold">+100 XP</div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <button className="text-duogreen-600 font-bold hover:text-duogreen-700 transition-colors">
                  View Full History →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

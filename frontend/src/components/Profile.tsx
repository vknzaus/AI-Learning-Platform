/**
 * Profile Component - User profile and achievements
 *
 * Features:
 * - User statistics and progress
 * - Achievement badges
 * - Learning history
 * - Personal goals and streaks
 */

import React, { useState } from "react";

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
    id: "1",
    name: "First Steps",
    description: "Complete your first lesson",
    icon: "👶",
    earned: true,
    earnedDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Streak Master",
    description: "Maintain a 7-day learning streak",
    icon: "🔥",
    earned: true,
    earnedDate: "2024-01-22",
  },
  {
    id: "3",
    name: "Knowledge Seeker",
    description: "Complete 10 lessons",
    icon: "🧠",
    earned: true,
    earnedDate: "2024-01-28",
  },
  {
    id: "4",
    name: "Lightning Fast",
    description: "Complete a lesson in under 2 minutes",
    icon: "⚡",
    earned: true,
    earnedDate: "2024-02-01",
  },
  {
    id: "5",
    name: "Perfect Score",
    description: "Get 100% on 5 consecutive lessons",
    icon: "🎯",
    earned: false,
    progress: 3,
    target: 5,
  },
  {
    id: "6",
    name: "Night Owl",
    description: "Complete lessons after 10 PM",
    icon: "🦉",
    earned: false,
    progress: 2,
    target: 10,
  },
  {
    id: "7",
    name: "Marathon Runner",
    description: "Maintain a 30-day streak",
    icon: "🏃",
    earned: false,
    progress: 4,
    target: 30,
  },
  {
    id: "8",
    name: "AI Expert",
    description: "Master all AI fundamentals",
    icon: "🤖",
    earned: false,
    progress: 15,
    target: 50,
  },
];

const userStats: LearningStats = {
  totalPoints: 1890,
  currentLevel: 8,
  currentStreak: 4,
  longestStreak: 12,
  totalLessons: 23,
  totalTimeSpent: 420, // 7 hours
  joinDate: "2024-01-10",
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

  if (diffDays === 1) return "1 day ago";
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }
  const years = Math.floor(diffDays / 365);
  return years === 1 ? "1 year ago" : `${years} years ago`;
};

const getLevelProgress = (level: number, points: number): number => {
  const pointsForCurrentLevel = level * 250;
  const pointsForNextLevel = (level + 1) * 250;
  const progressInLevel = points - pointsForCurrentLevel;
  const pointsNeededForLevel = pointsForNextLevel - pointsForCurrentLevel;
  return Math.max(
    0,
    Math.min(100, (progressInLevel / pointsNeededForLevel) * 100)
  );
};

export const Profile: React.FC<ProfileProps> = ({ className = "" }) => {
  const [activeTab, setActiveTab] = useState<
    "stats" | "achievements" | "history"
  >("stats");

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <div className="text-8xl mb-4">🙋‍♂️</div>
        <h1 className="text-4xl font-black text-white mb-2">
          Your Profile
        </h1>
        <p className="text-lg text-gray-400 font-medium">
          Track your AI learning journey! 📈
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div className="bg-slate-800 border border-teal-500 rounded-2xl p-4 text-center">
          <div className="text-3xl font-black text-teal-400">
            {userStats.totalPoints}
          </div>
          <div className="text-sm font-bold text-teal-300">
            Total Points
          </div>
        </div>
        <div className="bg-slate-800 border border-blue-500 rounded-2xl p-4 text-center">
          <div className="text-3xl font-black text-blue-400">
            {userStats.currentLevel}
          </div>
          <div className="text-sm font-bold text-blue-300">
            Current Level
          </div>
        </div>
        <div className="bg-slate-800 border border-yellow-500 rounded-2xl p-4 text-center">
          <div className="text-3xl font-black text-yellow-400">
            {userStats.currentStreak}
          </div>
          <div className="text-sm font-bold text-yellow-300">Day Streak</div>
        </div>
        <div className="bg-slate-800 border border-purple-500 rounded-2xl p-4 text-center">
          <div className="text-3xl font-black text-purple-400">
            {userStats.totalLessons}
          </div>
          <div className="text-sm font-bold text-purple-300">
            Lessons Done
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800 border-2 border-slate-700 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-black text-white">
              Level Progress
            </h3>
            <div className="text-sm font-bold text-gray-400">
              Level {userStats.currentLevel} → {userStats.currentLevel + 1}
            </div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-4 mb-2">
            <div
              className="bg-gradient-to-r from-teal-500 to-blue-500 h-4 rounded-full transition-all duration-500"
              style={{
                width: `${getLevelProgress(
                  userStats.currentLevel,
                  userStats.totalPoints
                )}%`,
              }}
            ></div>
          </div>
          <div className="text-sm text-gray-400 text-center">
            {Math.floor(
              (userStats.currentLevel + 1) * 250 - userStats.totalPoints
            )}{" "}
            points to next level
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-1 flex">
            {(["stats", "achievements", "history"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-6 py-2 rounded-xl font-bold text-sm transition-all duration-200 capitalize
                  ${
                    activeTab === tab
                      ? "bg-teal-500 text-white shadow-lg"
                      : "text-gray-400 hover:text-white"
                  }
                `}
              >
                {tab === "stats"
                  ? "📊 Stats"
                  : tab === "achievements"
                  ? "🏆 Achievements"
                  : "📚 History"}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "stats" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800 border-2 border-slate-700 rounded-3xl p-6">
              <h3 className="text-xl font-black text-white mb-4">
                📈 Learning Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Time Spent Learning</span>
                  <span className="font-bold text-white">
                    {formatTime(userStats.totalTimeSpent)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Longest Streak</span>
                  <span className="font-bold text-white">
                    {userStats.longestStreak} days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Average Score</span>
                  <span className="font-bold text-white">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Favorite Time</span>
                  <span className="font-bold text-white">7:00 PM</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 border-2 border-slate-700 rounded-3xl p-6">
              <h3 className="text-xl font-black text-white mb-4">
                🎯 Goals
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Daily Goal</span>
                    <span className="font-bold text-teal-400">
                      3/3 lessons
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full w-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Weekly Goal</span>
                    <span className="font-bold text-blue-400">
                      18/21 lessons
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "86%" }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-gray-400 mt-4">
                  Member since {getDaysAgo(userStats.joinDate)}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`
                  border-2 rounded-3xl p-4 transition-all duration-200
                  ${
                    achievement.earned
                      ? "bg-gradient-to-br from-yellow-900/20 to-yellow-800/20 border-yellow-600"
                      : "bg-slate-800 border-slate-700"
                  }
                `}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`
                    text-4xl p-2 rounded-2xl
                    ${
                      achievement.earned
                        ? "bg-yellow-600/20"
                        : "bg-slate-700 grayscale"
                    }
                  `}
                  >
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`font-black ${
                        achievement.earned
                          ? "text-yellow-400"
                          : "text-gray-500"
                      }`}
                    >
                      {achievement.name}
                    </h4>
                    <p className="text-sm text-gray-400 mb-2">
                      {achievement.description}
                    </p>

                    {achievement.earned ? (
                      <div className="text-xs text-yellow-300 font-bold">
                        ✅ Earned {getDaysAgo(achievement.earnedDate!)}
                      </div>
                    ) : achievement.progress !== undefined ? (
                      <div>
                        <div className="text-xs text-gray-400 mb-1">
                          Progress: {achievement.progress}/{achievement.target}
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-teal-500 h-2 rounded-full"
                            style={{
                              width: `${
                                (achievement.progress! / achievement.target!) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-500">🔒 Locked</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "history" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-800 border-2 border-slate-700 rounded-3xl p-6">
              <h3 className="text-xl font-black text-white mb-6">
                📚 Recent Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-teal-900/20 rounded-2xl">
                  <div className="text-2xl">✅</div>
                  <div className="flex-1">
                    <div className="font-bold text-white">
                      Completed: Neural Networks Basics
                    </div>
                    <div className="text-sm text-gray-400">
                      Score: 95% • 2 hours ago
                    </div>
                  </div>
                  <div className="text-teal-400 font-bold">+50 XP</div>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-blue-900/20 rounded-2xl">
                  <div className="text-2xl">🎯</div>
                  <div className="flex-1">
                    <div className="font-bold text-white">
                      Daily Goal Achieved!
                    </div>
                    <div className="text-sm text-gray-400">
                      Completed 3 lessons today
                    </div>
                  </div>
                  <div className="text-blue-400 font-bold">+25 XP</div>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-purple-900/20 rounded-2xl">
                  <div className="text-2xl">⚡</div>
                  <div className="flex-1">
                    <div className="font-bold text-white">
                      Speed Bonus!
                    </div>
                    <div className="text-sm text-gray-400">
                      Completed lesson in 1:45 minutes
                    </div>
                  </div>
                  <div className="text-purple-400 font-bold">+15 XP</div>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-yellow-900/20 rounded-2xl">
                  <div className="text-2xl">🏆</div>
                  <div className="flex-1">
                    <div className="font-bold text-white">
                      New Achievement!
                    </div>
                    <div className="text-sm text-gray-400">
                      Earned "Lightning Fast" badge
                    </div>
                  </div>
                  <div className="text-yellow-400 font-bold">+100 XP</div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button className="text-teal-400 font-bold hover:text-teal-300 transition-colors">
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

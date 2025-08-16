/**
 * Leaderboards Component - Competitive learning rankings
 *
 * Features:
 * - Global rankings
 * - Points-based scoring
 * - Achievement badges
 * - Fun and competitive design
 */

import React, { useState } from "react";

interface LeaderboardsProps {
  className?: string;
}

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  points: number;
  level: number;
  streak: number;
  badges: string[];
  rank: number;
}

const leaderboardData: LeaderboardUser[] = [
  {
    id: "1",
    name: "Alex Chen",
    avatar: "🧑‍💻",
    points: 2450,
    level: 12,
    streak: 15,
    badges: ["🏆", "⚡", "🧠"],
    rank: 1,
  },
  {
    id: "2",
    name: "Sarah Kim",
    avatar: "👩‍🔬",
    points: 2380,
    level: 11,
    streak: 12,
    badges: ["🎯", "⚡", "🌟"],
    rank: 2,
  },
  {
    id: "3",
    name: "Marcus Johnson",
    avatar: "👨‍🎓",
    points: 2290,
    level: 10,
    streak: 8,
    badges: ["🚀", "🧠", "💎"],
    rank: 3,
  },
  {
    id: "4",
    name: "Emma Wilson",
    avatar: "👩‍💼",
    points: 2150,
    level: 9,
    streak: 6,
    badges: ["🎯", "🌟"],
    rank: 4,
  },
  {
    id: "5",
    name: "You",
    avatar: "🙋‍♂️",
    points: 1890,
    level: 8,
    streak: 4,
    badges: ["⚡", "🌟"],
    rank: 5,
  },
  {
    id: "6",
    name: "David Park",
    avatar: "👨‍🏫",
    points: 1720,
    level: 7,
    streak: 3,
    badges: ["🧠"],
    rank: 6,
  },
  {
    id: "7",
    name: "Lisa Brown",
    avatar: "👩‍🚀",
    points: 1650,
    level: 7,
    streak: 7,
    badges: ["🚀", "💎"],
    rank: 7,
  },
  {
    id: "8",
    name: "James Lee",
    avatar: "👨‍💻",
    points: 1580,
    level: 6,
    streak: 2,
    badges: ["🎯"],
    rank: 8,
  },
];

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white";
    case 2:
      return "bg-gradient-to-r from-slate-500 to-slate-600 text-white";
    case 3:
      return "bg-gradient-to-r from-amber-600 to-amber-700 text-white";
    default:
      return "bg-slate-700 text-gray-300";
  }
};

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return `#${rank}`;
  }
};

export const Leaderboards: React.FC<LeaderboardsProps> = ({
  className = "",
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "weekly" | "monthly" | "allTime"
  >("allTime");

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-black text-white mb-4">🏆 Leaderboards</h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto font-medium">
          See how you rank against other AI learners! 🚀
        </p>
      </div>

      {/* Period Selector */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-1 flex">
          {(["weekly", "monthly", "allTime"] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`
                px-6 py-2 rounded-xl font-bold text-sm transition-all duration-200
                ${
                  selectedPeriod === period
                    ? "bg-teal-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }
              `}
            >
              {period === "weekly"
                ? "This Week"
                : period === "monthly"
                ? "This Month"
                : "All Time"}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-center items-end space-x-4 mb-8">
          {/* 2nd Place */}
          <div className="text-center">
            <div className="bg-gradient-to-b from-slate-600 to-slate-700 rounded-2xl p-4 mb-4 transform hover:scale-105 transition-transform">
              <div className="text-4xl mb-2">{leaderboardData[1].avatar}</div>
              <div className="text-white font-bold text-sm">
                {leaderboardData[1].name}
              </div>
              <div className="text-white font-black text-lg">
                {leaderboardData[1].points}
              </div>
            </div>
            <div className="text-5xl">🥈</div>
          </div>

          {/* 1st Place */}
          <div className="text-center">
            <div className="bg-gradient-to-b from-yellow-500 to-yellow-600 rounded-2xl p-6 mb-4 transform hover:scale-105 transition-transform">
              <div className="text-5xl mb-2">{leaderboardData[0].avatar}</div>
              <div className="text-white font-bold">
                {leaderboardData[0].name}
              </div>
              <div className="text-white font-black text-xl">
                {leaderboardData[0].points}
              </div>
              <div className="flex justify-center mt-2">
                {leaderboardData[0].badges.map((badge, i) => (
                  <span key={i} className="text-lg">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-6xl">🥇</div>
          </div>

          {/* 3rd Place */}
          <div className="text-center">
            <div className="bg-gradient-to-b from-amber-600 to-amber-700 rounded-2xl p-4 mb-4 transform hover:scale-105 transition-transform">
              <div className="text-4xl mb-2">{leaderboardData[2].avatar}</div>
              <div className="text-white font-bold text-sm">
                {leaderboardData[2].name}
              </div>
              <div className="text-white font-black text-lg">
                {leaderboardData[2].points}
              </div>
            </div>
            <div className="text-5xl">🥉</div>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-black text-white mb-6 text-center">
          Full Rankings
        </h2>
        <div className="space-y-3">
          {leaderboardData.map((user) => (
            <div
              key={user.id}
              className={`
                flex items-center p-4 rounded-2xl border-2 transition-all duration-200
                ${
                  user.name === "You"
                    ? "border-teal-500 bg-slate-700 shadow-lg"
                    : "border-slate-700 bg-slate-800 hover:shadow-md hover:border-slate-600"
                }
              `}
            >
              {/* Rank */}
              <div
                className={`
                w-12 h-12 rounded-full flex items-center justify-center font-black text-lg mr-4
                ${getRankColor(user.rank)}
              `}
              >
                {getRankIcon(user.rank)}
              </div>

              {/* Avatar & Name */}
              <div className="flex items-center flex-1">
                <div className="text-3xl mr-3">{user.avatar}</div>
                <div>
                  <div
                    className={`font-black ${
                      user.name === "You" ? "text-teal-300" : "text-white"
                    }`}
                  >
                    {user.name}
                    {user.name === "You" && (
                      <span className="ml-2 text-sm font-normal">(You)</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-400">
                    Level {user.level} • {user.streak} day streak
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex space-x-1 mr-4">
                {user.badges.map((badge, i) => (
                  <span key={i} className="text-xl">
                    {badge}
                  </span>
                ))}
              </div>

              {/* Points */}
              <div className="text-right">
                <div className="font-black text-xl text-yellow-400">
                  {user.points.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">points</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Stats */}
      <div className="max-w-2xl mx-auto mt-8">
        <div className="bg-slate-800 border-2 border-slate-700 rounded-3xl p-6">
          <h3 className="text-xl font-black text-white mb-4 text-center">
            🎯 Your Progress
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-black text-teal-400">75</div>
              <div className="text-sm text-gray-400">Points to next level</div>
            </div>
            <div>
              <div className="text-2xl font-black text-blue-400">3</div>
              <div className="text-sm text-gray-400">Ranks to climb</div>
            </div>
            <div>
              <div className="text-2xl font-black text-purple-400">4</div>
              <div className="text-sm text-gray-400">Day streak</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

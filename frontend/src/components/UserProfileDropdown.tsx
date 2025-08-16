import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const UserProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const handleSignOut = () => {
    signOut();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl transition-all duration-200 border border-slate-600"
      >
        <div className="text-2xl">{user.avatar || '👤'}</div>
        <div className="text-left">
          <div className="text-white font-semibold text-sm">{user.username}</div>
          <div className="text-gray-400 text-xs">Level {user.level}</div>
        </div>
        <div className="text-gray-400 text-sm">
          {isOpen ? '▲' : '▼'}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden">
          {/* User Info Header */}
          <div className="p-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{user.avatar || '👤'}</div>
              <div>
                <div className="font-bold text-lg">{user.username}</div>
                <div className="text-teal-100 text-sm">{user.email}</div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="p-4 border-b border-slate-700">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl mb-1">💎</div>
                <div className="text-blue-400 font-bold text-lg">{user.gems}</div>
                <div className="text-gray-400 text-xs">Gems</div>
              </div>
              <div>
                <div className="text-2xl mb-1">❤️</div>
                <div className="text-red-400 font-bold text-lg">{user.hearts}</div>
                <div className="text-gray-400 text-xs">Hearts</div>
              </div>
              <div>
                <div className="text-2xl mb-1">⚡</div>
                <div className="text-yellow-400 font-bold text-lg">{user.xp}</div>
                <div className="text-gray-400 text-xs">XP</div>
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold">Level {user.level}</span>
              <span className="text-gray-400 text-sm">Level {user.level + 1}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${Math.min(100, ((user.xp % 500) / 500) * 100)}%` 
                }}
              ></div>
            </div>
            <div className="text-gray-400 text-xs mt-1 text-center">
              {500 - (user.xp % 500)} XP to next level
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <button 
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-700 transition-colors flex items-center space-x-3"
              onClick={() => {
                console.log('Navigate to profile');
                setIsOpen(false);
              }}
            >
              <span className="text-xl">👤</span>
              <span className="text-white font-medium">View Profile</span>
            </button>
            
            <button 
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-700 transition-colors flex items-center space-x-3"
              onClick={() => {
                console.log('Navigate to settings');
                setIsOpen(false);
              }}
            >
              <span className="text-xl">⚙️</span>
              <span className="text-white font-medium">Settings</span>
            </button>
            
            <button 
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-700 transition-colors flex items-center space-x-3"
              onClick={() => {
                console.log('Navigate to achievements');
                setIsOpen(false);
              }}
            >
              <span className="text-xl">🏆</span>
              <span className="text-white font-medium">Achievements</span>
            </button>

            <div className="border-t border-slate-700 my-2"></div>
            
            <button 
              onClick={handleSignOut}
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-900/50 transition-colors flex items-center space-x-3 text-red-400 hover:text-red-300"
            >
              <span className="text-xl">🚪</span>
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

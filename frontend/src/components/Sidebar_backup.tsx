import React, { useState } from 'react';
import { FunLabsLogo } from './FunLabsLogo';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
  badge?: number;
  children?: MenuItem[];
  color?: 'green' | 'blue' | 'purple' | 'yellow' | 'red';
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    href: '/',
    color: 'blue'
  },
  {
    id: 'learning',
    label: 'Learning Paths',
    icon: '🎓',
    color: 'green',
    children: [
      { id: 'ai-fundamentals', label: 'AI Fundamentals', icon: '🤖', href: '/learning/ai-fundamentals', color: 'blue' },
      { id: 'machine-learning', label: 'Machine Learning', icon: '🧠', href: '/learning/machine-learning', color: 'green' },
      { id: 'deep-learning', label: 'Deep Learning', icon: '🔬', href: '/learning/deep-learning', color: 'purple' },
      { id: 'nlp', label: 'Natural Language Processing', icon: '💬', href: '/learning/nlp', color: 'yellow' }
    ]
  },
  {
    id: 'practice',
    label: 'Practice Labs',
    icon: '🛠️',
    badge: 3,
    color: 'purple',
    children: [
      { id: 'coding-challenges', label: 'Coding Challenges', icon: '💻', href: '/practice/coding', color: 'green' },
      { id: 'projects', label: 'Projects', icon: '🚀', href: '/practice/projects', color: 'blue' },
      { id: 'quizzes', label: 'Quizzes', icon: '❓', href: '/practice/quizzes', color: 'yellow' }
    ]
  },
  {
    id: 'progress',
    label: 'Progress Tracking',
    icon: '📈',
    href: '/progress',
    color: 'yellow'
  },
  {
    id: 'resources',
    label: 'Resources',
    icon: '📚',
    color: 'red',
    children: [
      { id: 'documentation', label: 'Documentation', icon: '📖', href: '/resources/docs', color: 'blue' },
      { id: 'tutorials', label: 'Video Tutorials', icon: '🎥', href: '/resources/tutorials', color: 'green' },
      { id: 'community', label: 'Community Forum', icon: '👥', href: '/resources/community', color: 'purple' }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    href: '/settings',
    color: 'blue'
  }
];

const getColorClasses = (color?: string) => {
  switch (color) {
    case 'green':
      return {
        bg: 'hover:bg-duogreen-50',
        text: 'hover:text-duogreen-700',
        border: 'hover:border-duogreen-200',
        badge: 'bg-duogreen-500',
        active: 'bg-duogreen-100 text-duogreen-800 border-duogreen-300'
      };
    case 'blue':
      return {
        bg: 'hover:bg-duoblue-50',
        text: 'hover:text-duoblue-700',
        border: 'hover:border-duoblue-200',
        badge: 'bg-duoblue-500',
        active: 'bg-duoblue-100 text-duoblue-800 border-duoblue-300'
      };
    case 'purple':
      return {
        bg: 'hover:bg-duopurple-50',
        text: 'hover:text-duopurple-700',
        border: 'hover:border-duopurple-200',
        badge: 'bg-duopurple-500',
        active: 'bg-duopurple-100 text-duopurple-800 border-duopurple-300'
      };
    case 'yellow':
      return {
        bg: 'hover:bg-duoyellow-50',
        text: 'hover:text-duoyellow-700',
        border: 'hover:border-duoyellow-200',
        badge: 'bg-duoyellow-500',
        active: 'bg-duoyellow-100 text-duoyellow-800 border-duoyellow-300'
      };
    case 'red':
      return {
        bg: 'hover:bg-duored-50',
        text: 'hover:text-duored-700',
        border: 'hover:border-duored-200',
        badge: 'bg-duored-500',
        active: 'bg-duored-100 text-duored-800 border-duored-300'
      };
    default:
      return {
        bg: 'hover:bg-duogray-50',
        text: 'hover:text-duogray-700',
        border: 'hover:border-duogray-200',
        badge: 'bg-duogray-500',
        active: 'bg-duogray-100 text-duogray-800 border-duogray-300'
      };
  }
};

const MenuItem: React.FC<{
  item: MenuItem;
  isExpanded: boolean;
  onToggle: () => void;
  level?: number;
}> = ({ item, isExpanded, onToggle, level = 0 }) => {
  const [isChildrenExpanded, setIsChildrenExpanded] = useState(false);
  const colorClasses = getColorClasses(item.color);

  const handleClick = () => {
    if (item.children) {
      setIsChildrenExpanded(!isChildrenExpanded);
    } else if (item.href) {
      // Handle navigation - for now just log
      console.log(`Navigating to: ${item.href}`);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleClick}
        className={`
          w-full flex items-center justify-between px-3 py-3 text-left
          ${colorClasses.bg} ${colorClasses.text} border border-transparent ${colorClasses.border}
          transition-all duration-200 transform hover:scale-105
          ${level > 0 ? 'pl-8 ml-4' : ''}
          ${!isExpanded ? 'px-2 justify-center' : ''}
          group rounded-2xl mx-2 shadow-sm hover:shadow-md
          font-medium
        `}
      >
        <div className="flex items-center space-x-3">
          <span className="text-xl flex-shrink-0 transform group-hover:scale-110 transition-transform duration-200">
            {item.icon}
          </span>
          {isExpanded && (
            <span className="font-semibold text-duogray-700 truncate transition-colors duration-200">
              {item.label}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {isExpanded && item.badge && (
            <span className={`
              ${colorClasses.badge} text-white text-xs font-bold 
              px-2 py-1 rounded-full min-w-[20px] text-center
              shadow-sm transform group-hover:scale-110 transition-all duration-200
            `}>
              {item.badge}
            </span>
          )}
          
          {isExpanded && item.children && (
            <span className={`
              text-duogray-400 transition-all duration-200 transform
              ${isChildrenExpanded ? 'rotate-180' : ''}
              group-hover:text-duogray-600
            `}>
              ▼
            </span>
          )}
        </div>
      </button>

      {/* Children */}
      {item.children && isChildrenExpanded && isExpanded && (
        <div className="ml-2 space-y-1 mt-1">
          {item.children.map((child) => (
            <MenuItem
              key={child.id}
              item={child}
              isExpanded={isExpanded}
              onToggle={onToggle}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
            <span className="bg-primary-100 text-primary-700 text-xs font-medium px-2 py-1 rounded-full">
              {item.badge}
            </span>
          )}
          {item.children && isExpanded && (
            <span className={`text-gray-400 transition-transform ${isChildrenExpanded ? 'rotate-90' : ''}`}>
              ▶
            </span>
          )}
        </div>
      </button>

      {/* Children Menu Items */}
      {item.children && isChildrenExpanded && isExpanded && (
        <div className="ml-4 border-l-2 border-slate-200">
          {item.children.map((child) => (
            <MenuItem
              key={child.id}
              item={child}
              isExpanded={isExpanded}
              onToggle={onToggle}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-0 h-full bg-slate-50 border-r border-slate-200
          z-50 transition-all duration-300 ease-in-out shadow-sm
          ${isOpen ? 'w-64' : 'w-16'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b border-slate-200 bg-white ${!isOpen ? 'px-2' : ''}`}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FL</span>
            </div>
            {isOpen && (
              <div>
                <h1 className="text-lg font-bold text-deepblue-900">FunLabs</h1>
                <p className="text-xs text-deepblue-500">AI Learning Platform</p>
              </div>
            )}
          </div>
          
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <span className={`text-deepblue-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
              ◀
            </span>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                isExpanded={isOpen}
                onToggle={onToggle}
              />
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className={`border-t border-slate-200 bg-white p-4 ${!isOpen ? 'px-2' : ''}`}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
              <span className="text-slate-600 text-sm font-medium">U</span>
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">
                  Student
                </p>
                <p className="text-xs text-slate-500 truncate">
                  student@funlabs.ai
                </p>
              </div>
            )}
          </div>
          
          {isOpen && (
            <div className="mt-3 flex space-x-2">
              <button className="flex-1 text-xs py-2 px-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                Profile
              </button>
              <button className="flex-1 text-xs py-2 px-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

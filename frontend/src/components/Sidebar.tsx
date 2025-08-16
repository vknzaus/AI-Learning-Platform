/**
 * FunLabs Sidebar Component - Fun and engaging design
 *
 * A vibrant, colorful sidebar navigation for easy access to learning content.
 * Features dynamic colors, smooth animations, and an engaging user experience.
 *
 * Features:
 * - Colorful, categorized menu items
 * - Smooth hover effects and animations
 * - Collapsible menu sections
 * - Prominent FunLabs branding
 * - Responsive design for mobile/desktop
 */

import React, { useState } from "react";
import { FunLabsLogo } from "./FunLabsLogo";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavigate?: (section: string) => void;
  currentSection?: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
  badge?: number;
  children?: MenuItem[];
  color?: "green" | "blue" | "purple" | "yellow" | "red";
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "📊",
    href: "/",
    color: "blue",
  },
  {
    id: "learning",
    label: "Learn AI",
    icon: "🤖",
    href: "/learning/ai",
    color: "green",
  },
  {
    id: "practice",
    label: "Practice",
    icon: "🎯",
    href: "/practice",
    color: "purple",
  },
  {
    id: "leaderboards",
    label: "Leaderboards",
    icon: "🏆",
    href: "/leaderboards",
    color: "yellow",
  },
  {
    id: "profile",
    label: "Profile",
    icon: "👤",
    href: "/profile",
    color: "red",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "⚙️",
    href: "/settings",
    color: "blue",
  },
];

const getColorClasses = (color?: string) => {
  switch (color) {
    case "green":
      return {
        bg: "hover:bg-teal-700/30",
        text: "text-green-400 hover:text-green-300",
        border: "hover:border-green-500",
        badge: "bg-green-500",
        active: "bg-green-600/20 text-green-300 border-green-500",
      };
    case "blue":
      return {
        bg: "hover:bg-blue-700/30",
        text: "text-blue-400 hover:text-blue-300",
        border: "hover:border-blue-500",
        badge: "bg-blue-500",
        active: "bg-blue-600/20 text-blue-300 border-blue-500",
      };
    case "purple":
      return {
        bg: "hover:bg-purple-700/30",
        text: "text-purple-400 hover:text-purple-300",
        border: "hover:border-purple-500",
        badge: "bg-purple-500",
        active: "bg-purple-600/20 text-purple-300 border-purple-500",
      };
    case "yellow":
      return {
        bg: "hover:bg-yellow-700/30",
        text: "text-yellow-400 hover:text-yellow-300",
        border: "hover:border-yellow-500",
        badge: "bg-yellow-500",
        active: "bg-yellow-600/20 text-yellow-300 border-yellow-500",
      };
    case "red":
      return {
        bg: "hover:bg-red-700/30",
        text: "text-red-400 hover:text-red-300",
        border: "hover:border-red-500",
        badge: "bg-red-500",
        active: "bg-red-600/20 text-red-300 border-red-500",
      };
    default:
      return {
        bg: "hover:bg-gray-700",
        text: "text-gray-300 hover:text-white",
        border: "hover:border-gray-500",
        badge: "bg-gray-500",
        active: "bg-gray-600 text-white border-gray-500",
      };
  }
};

const MenuItem: React.FC<{
  item: MenuItem;
  onToggle: () => void;
  onNavigate?: (section: string) => void;
  currentSection?: string;
  level?: number;
}> = ({ item, onToggle, onNavigate, currentSection, level = 0 }) => {
  const [isChildrenExpanded, setIsChildrenExpanded] = useState(false);
  const colorClasses = getColorClasses(item.color);

  const handleClick = () => {
    if (item.children) {
      setIsChildrenExpanded(!isChildrenExpanded);
    } else if (onNavigate) {
      // Use the navigation callback
      onNavigate(item.id);
    } else if (item.href) {
      // Fallback to logging
      console.log(`Navigating to: ${item.href}`);
    }
  };

  const isActive = currentSection === item.id;

  return (
    <div className="w-full">
      <button
        onClick={handleClick}
        className={`
          w-full flex items-center justify-between px-3 py-3 text-left
          ${
            isActive
              ? colorClasses.active
              : `${colorClasses.bg} ${colorClasses.text} border-transparent ${colorClasses.border}`
          }
          transition-all duration-200 transform hover:scale-105
          ${level > 0 ? "pl-8 ml-4" : ""}
          group rounded-2xl mx-2 shadow-sm hover:shadow-md
          font-medium border
        `}
      >
        <div className="flex items-center space-x-3">
          <span className="text-xl flex-shrink-0 transform group-hover:scale-110 transition-transform duration-200">
            {item.icon}
          </span>
          <span className="font-semibold truncate transition-colors duration-200">
            {item.label}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {item.badge && (
            <span
              className={`
              ${colorClasses.badge} text-white text-xs font-bold 
              px-2 py-1 rounded-full min-w-[20px] text-center
              shadow-sm transform group-hover:scale-110 transition-all duration-200
            `}
            >
              {item.badge}
            </span>
          )}

          {item.children && (
            <span
              className={`
              text-duogray-400 transition-all duration-200 transform
              ${isChildrenExpanded ? "rotate-180" : ""}
              group-hover:text-duogray-600
            `}
            >
              ▼
            </span>
          )}
        </div>
      </button>

      {/* Children */}
      {item.children && isChildrenExpanded && (
        <div className="ml-2 space-y-1 mt-1">
          {item.children.map((child) => (
            <MenuItem
              key={child.id}
              item={child}
              onToggle={onToggle}
              onNavigate={onNavigate}
              currentSection={currentSection}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  onNavigate,
  currentSection = "dashboard",
}) => {
  return (
    <>
      {/* Backdrop overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar - Fixed position overlay with flyout behavior */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 bg-slate-800
          transform transition-all duration-300 ease-in-out
          border-r border-slate-700 shadow-2xl w-64
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header with FunLabs Logo - only when open */}
        <div className="flex items-center justify-between p-3 border-b border-slate-700 bg-slate-800">
          <div className="flex items-center">
            <FunLabsLogo
              size="lg"
              showText={true}
              onClick={() => console.log("Sidebar logo clicked!")}
              className="hover:scale-105 transition-transform duration-200"
            />
          </div>

          {/* Close button */}
          <button
            onClick={onToggle}
            className="p-2 rounded-xl hover:bg-slate-700 transition-colors"
          >
            <span className="text-gray-300 text-lg">✕</span>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-2 bg-slate-800">
          {/* Menu Items */}
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              onToggle={onToggle}
              onNavigate={onNavigate}
              currentSection={currentSection}
            />
          ))}

          {/* Progress Section - only when expanded */}
          {isOpen && (
            <div className="mt-8 pt-6 border-t border-slate-600">
              <div className="bg-slate-700 rounded-2xl p-4 border border-slate-600">
                <h4 className="font-bold text-white mb-2 flex items-center">
                  <span className="mr-2">🏆</span>
                  Your Progress
                </h4>

                {/* Progress Bar */}
                <div className="w-full bg-slate-600 rounded-full h-3 mb-2">
                  <div className="bg-gradient-to-r from-teal-500 to-blue-500 h-3 rounded-full w-3/4 shadow-sm"></div>
                </div>

                <div className="flex justify-between text-xs text-gray-300">
                  <span>Level 3</span>
                  <span>75% Complete</span>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

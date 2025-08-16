/**
 * FunLabs Logo Component - Duolingo-inspired design
 *
 * A vibrant, playful logo component that captures the fun and engaging
 * nature of the FunLabs learning platform, inspired by Duolingo's
 * colorful and modern design approach.
 *
 * Features:
 * - Animated gradient background
 * - Playful hover effects
 * - Multiple size variants
 * - Accessible design with proper ARIA labels
 */

import React from "react";

interface FunLabsLogoProps {
  /** Size variant of the logo */
  size?: "sm" | "md" | "lg" | "xl";
  /** Whether to show the text label */
  showText?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Click handler for logo interactions */
  onClick?: () => void;
}

/**
 * FunLabs Logo Component with Duolingo-inspired styling
 *
 * @param props Logo configuration options
 * @returns Rendered logo component
 */
export const FunLabsLogo: React.FC<FunLabsLogoProps> = ({
  size = "md",
  showText = true,
  className = "",
  onClick,
}) => {
  // Size configurations for different variants
  const sizeConfigs = {
    sm: {
      container: "w-8 h-8",
      text: "text-sm",
      logoText: "text-xs",
      spacing: "space-x-2",
    },
    md: {
      container: "w-10 h-10",
      text: "text-lg",
      logoText: "text-sm",
      spacing: "space-x-3",
    },
    lg: {
      container: "w-12 h-12",
      text: "text-xl",
      logoText: "text-base",
      spacing: "space-x-4",
    },
    xl: {
      container: "w-16 h-16",
      text: "text-2xl",
      logoText: "text-lg",
      spacing: "space-x-4",
    },
  };

  const config = sizeConfigs[size];

  return (
    <div
      className={`flex items-center ${config.spacing} ${className} ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label="FunLabs - AI Learning Platform"
    >
      {/* Logo Icon with Duolingo-inspired design */}
      <div
        className={`
        ${config.container}
        relative
        bg-gradient-to-br from-duogreen-400 via-duoblue-500 to-duopurple-500
        rounded-2xl
        shadow-xl
        transform transition-all duration-300
        hover:scale-125 hover:shadow-2xl hover:rotate-6
        group
        overflow-hidden
        border-2 border-white
        funlabs-logo
        ${onClick ? "cursor-pointer" : ""}
      `}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-duogreen-300 via-duoblue-400 to-duopurple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow"></div>

        {/* Main logo content */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {/* FL text with enhanced styling */}
          <span
            className={`
            ${config.logoText}
            font-black
            text-white
            drop-shadow-lg
            transform transition-all duration-300
            group-hover:scale-125
            relative
            z-10
          `}
          >
            FL
          </span>

          {/* Enhanced decorative elements */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-duoyellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-150 animate-bounce-subtle"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-duored-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-125"></div>
          <div className="absolute top-1 left-1 w-2 h-2 bg-duogreen-300 rounded-full opacity-50 group-hover:opacity-100 transition-all duration-400"></div>
        </div>

        {/* Enhanced shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] group-hover:opacity-30 transition-all duration-700"></div>

        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-duogreen-400 via-duoblue-500 to-duopurple-500 rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-all duration-500 -z-10"></div>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <h1
            className={`
            ${config.text}
            font-black
            text-transparent bg-clip-text
            bg-gradient-to-r from-duogreen-600 via-duoblue-600 to-duopurple-600
            transition-all duration-300
            hover:from-duogreen-500 hover:via-duoblue-500 hover:to-duopurple-500
            animate-pulse-slow
            group-hover:scale-110
          `}
          >
            FunLabs
          </h1>
        </div>
      )}

      {/* Floating particles effect (hidden by default, shown on hover) */}
      <div className="absolute pointer-events-none">
        <div
          className="w-1 h-1 bg-duoyellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce-subtle transition-opacity duration-300"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-1 h-1 bg-duogreen-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce-subtle transition-opacity duration-300"
          style={{ animationDelay: "0.3s" }}
        ></div>
        <div
          className="w-1 h-1 bg-duoblue-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce-subtle transition-opacity duration-300"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>
    </div>
  );
};

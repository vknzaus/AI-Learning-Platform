import { Button } from './ui';
import { FunLabsLogo } from './FunLabsLogo';

interface HeaderProps {
  onMenuToggle?: () => void;
  isSidebarOpen?: boolean;
}

export const Header = ({ 
  onMenuToggle,
  isSidebarOpen = false 
}: HeaderProps) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50 backdrop-blur-sm bg-gray-800/95 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-4">
          {/* Left side - Menu and Logo */}
          <div className="flex items-center space-x-4">
            {/* Menu Toggle Button with Dark theme styling */}
            {onMenuToggle && (
              <button
                onClick={onMenuToggle}
                className="p-2 rounded-xl hover:bg-slate-700 active:bg-slate-600 transition-all duration-200 border border-slate-600 hover:border-slate-500"
                aria-label="Toggle menu"
              >
                <span className={`text-white transition-transform duration-200 text-lg ${isSidebarOpen ? 'rotate-90' : ''}`}>
                  ☰
                </span>
              </button>
            )}
            
            {/* Enhanced FunLabs Logo */}
            <FunLabsLogo 
              size="lg" 
              showText={true}
              onClick={() => console.log('Logo clicked!')}
              className="hover:scale-105 transition-transform duration-200"
            />
          </div>
          
          {/* Centered Title and Subtitle */}
          <div className="flex-1 flex flex-col items-center justify-center mx-8">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400">
              Learn AI & ML
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 font-medium leading-tight text-center">
              Master artificial intelligence through fun, interactive lessons!
            </p>
          </div>

          {/* Right side - Navigation and Actions */}
          <div className="flex items-center space-x-4">
            {/* Gems and Hearts for gamification */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Gems for power-ups */}
              <div className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-all duration-200 cursor-pointer">
                <span className="text-blue-400 text-lg animate-pulse">💎</span>
                <span className="text-blue-300 font-semibold text-sm">250</span>
              </div>
              
              {/* Hearts for health */}
              <div className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-all duration-200 cursor-pointer">
                <span className="text-red-400 text-lg animate-pulse">❤️</span>
                <span className="text-red-300 font-semibold text-sm">5</span>
              </div>
              
              {/* Sign In Button with Dark theme styling */}
              <Button 
                variant="outline" 
                size="sm"
                className="bg-gradient-to-r from-teal-500 to-blue-500 text-white border-none hover:from-teal-600 hover:to-blue-600 font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                Sign In
              </Button>
            </div>
            
            {/* Mobile Menu Button for small screens */}
            <div className="md:hidden">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-slate-700 border-slate-600 text-gray-300 hover:bg-slate-600"
              >
                Menu
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

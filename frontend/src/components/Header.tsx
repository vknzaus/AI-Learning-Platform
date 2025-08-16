import { Button } from './ui';
import { FunLabsLogo } from './FunLabsLogo';

interface HeaderProps {
  onTestConnection?: () => void;
  connectionStatus?: 'connected' | 'disconnected' | 'testing';
  topicsCount?: number;
  onMenuToggle?: () => void;
  isSidebarOpen?: boolean;
}

export const Header = ({ 
  onTestConnection, 
  connectionStatus = 'disconnected', 
  topicsCount = 0, 
  onMenuToggle,
  isSidebarOpen = false 
}: HeaderProps) => {
  const getStatusIndicator = () => {
    switch (connectionStatus) {
      case 'connected':
        return (
          <div className="flex items-center space-x-2 text-sm text-teal-400 font-medium">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
            <span>Connected • {topicsCount} courses loaded</span>
          </div>
        );
      case 'testing':
        return (
          <div className="flex items-center space-x-2 text-sm text-blue-400 font-medium">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>Loading courses...</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-2 text-sm text-gray-400 font-medium">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <span>Offline</span>
          </div>
        );
    }
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50 backdrop-blur-sm bg-gray-800/95 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title - More Prominent */}
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
            
            {/* Status indicator for larger screens */}
            <div className="hidden sm:block ml-4">
              {getStatusIndicator()}
            </div>
          </div>

          {/* Navigation and Actions with Duolingo styling */}
          <div className="flex items-center space-x-4">
            {/* Mobile status indicator */}
            <div className="sm:hidden">
              {getStatusIndicator()}
            </div>
            
            {/* Test Connection Button with Dark theme styling */}
            {connectionStatus === 'disconnected' && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onTestConnection}
                className="hidden sm:flex bg-slate-700 border-slate-600 text-gray-300 hover:bg-slate-600 hover:border-slate-500 transition-all duration-200 font-semibold"
              >
                🔌 Test Connection
              </Button>
            )}
            
            {/* Navigation Links with Dark theme styling */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-300 hover:text-teal-400 font-semibold text-sm transition-all duration-200 px-3 py-2 rounded-lg hover:bg-slate-700">
                📚 Courses
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 font-semibold text-sm transition-all duration-200 px-3 py-2 rounded-lg hover:bg-slate-700">
                🎓 Programs  
              </a>
              <a href="#" className="text-gray-300 hover:text-purple-400 font-semibold text-sm transition-all duration-200 px-3 py-2 rounded-lg hover:bg-slate-700">
                🏢 For Business
              </a>
              
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

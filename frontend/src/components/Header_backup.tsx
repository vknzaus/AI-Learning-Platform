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
          <div className="flex items-center space-x-2 text-sm text-duogreen-600 font-medium">
            <div className="w-2 h-2 bg-duogreen-500 rounded-full animate-pulse"></div>
            <span>Connected • {topicsCount} courses loaded</span>
          </div>
        );
      case 'testing':
        return (
          <div className="flex items-center space-x-2 text-sm text-duoblue-600 font-medium">
            <div className="w-2 h-2 bg-duoblue-500 rounded-full animate-pulse"></div>
            <span>Loading courses...</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-2 text-sm text-duogray-500 font-medium">
            <div className="w-2 h-2 bg-duogray-400 rounded-full"></div>
            <span>Offline</span>
          </div>
        );
    }
  };

  return (
    <header className="bg-white border-b border-duogray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title - More Prominent */}
          <div className="flex items-center space-x-4">
            {/* Menu Toggle Button with Duolingo styling */}
            {onMenuToggle && (
              <button
                onClick={onMenuToggle}
                className="p-2 rounded-xl hover:bg-duogreen-50 active:bg-duogreen-100 transition-all duration-200 lg:hidden border border-duogreen-200 hover:border-duogreen-300"
                aria-label="Toggle menu"
              >
                <span className={`text-duogreen-600 transition-transform duration-200 text-lg ${isSidebarOpen ? 'rotate-90' : ''}`}>
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
            
            {/* Test Connection Button with Duolingo styling */}
            {connectionStatus === 'disconnected' && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onTestConnection}
                className="hidden sm:flex bg-duogreen-50 border-duogreen-200 text-duogreen-700 hover:bg-duogreen-100 hover:border-duogreen-300 transition-all duration-200 font-semibold"
              >
                🔌 Test Connection
              </Button>
            )}
            
            {/* Navigation Links with Duolingo styling */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-duogray-700 hover:text-duogreen-600 font-semibold text-sm transition-all duration-200 px-3 py-2 rounded-lg hover:bg-duogreen-50">
                📚 Courses
              </a>
              <a href="#" className="text-duogray-700 hover:text-duoblue-600 font-semibold text-sm transition-all duration-200 px-3 py-2 rounded-lg hover:bg-duoblue-50">
                🎓 Programs  
              </a>
              <a href="#" className="text-duogray-700 hover:text-duopurple-600 font-semibold text-sm transition-all duration-200 px-3 py-2 rounded-lg hover:bg-duopurple-50">
                🏢 For Business
              </a>
              
              {/* Sign In Button with Duolingo styling */}
              <Button 
                variant="outline" 
                size="sm"
                className="bg-gradient-to-r from-duoblue-500 to-duogreen-500 text-white border-none hover:from-duoblue-600 hover:to-duogreen-600 font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                Sign In
              </Button>
            </div>
            
            {/* Mobile Menu Button for small screens */}
            <div className="md:hidden">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-duoblue-50 border-duoblue-200 text-duoblue-700 hover:bg-duoblue-100"
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
            
            {/* Mobile Menu Button for small screens */}
            <div className="md:hidden">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-duoblue-50 border-duoblue-200 text-duoblue-700 hover:bg-duoblue-100"
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

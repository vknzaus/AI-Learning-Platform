/**
 * FunLabs AI Learning Platform - Main Application Component
 * 
 * This is the root component that orchestrates the entire learning platform.
 * It manages the application state, handles API connections, and renders
 * the main layout including sidebar, header, and content areas.
 * 
 * Key Features:
 * - Topic management and display
 * - Connection status monitoring
 * - Sidebar navigation control
 * - Error handling and retry mechanisms
 * - Responsive design layout
 * 
 * @author FunLabs Team
 * @version 1.0.0
 */

import { useEffect, useState } from "react";
import type { Topic } from "./services/api";
import { topicsApi } from "./services/api";
import { Header } from "./components/Header";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { TopicCard } from "./components/TopicCard";
import { Sidebar } from "./components/Sidebar";
import "./App.css";

/**
 * Main Application Component
 * 
 * Manages the overall application state and renders the main layout.
 * Handles data fetching, error states, and user interactions.
 */
function App() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  /** Array of learning topics fetched from the backend API */
  const [topics, setTopics] = useState<Topic[]>([]);
  
  /** Loading state for initial data fetch and retries */
  const [loading, setLoading] = useState(true);
  
  /** Error message state for displaying connection/fetch errors */
  const [error, setError] = useState<string | null>(null);
  
  /** Connection status indicator for real-time backend connectivity */
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'testing'>('disconnected');
  
  /** Sidebar visibility state for responsive navigation */
  const [sidebarOpen, setSidebarOpen] = useState(false);

  console.log('🚀 FunLabs App initialized with state:', {
    topicsCount: topics.length,
    loading,
    error: !!error,
    connectionStatus,
    sidebarOpen
  });

  // ============================================================================
  // API FUNCTIONS
  // ============================================================================

  /**
   * Fetches learning topics from the backend API
   * 
   * This function handles the complete flow of:
   * 1. Setting connection status to testing
   * 2. Making API request to fetch topics
   * 3. Updating state with received data
   * 4. Handling errors gracefully
   * 5. Managing loading states
   */
  const fetchTopics = async () => {
    console.log('📡 Starting topic fetch from backend API...');
    
    try {
      // Update UI to show we're testing the connection
      setConnectionStatus('testing');
      console.log('🔄 Connection status set to testing');
      
      // Make API call to get topics
      console.log('🌐 Calling topicsApi.getAll()...');
      const response = await topicsApi.getAll();
      
      // Log successful response
      console.log('✅ Topics received successfully:', {
        count: response.data.length,
        topics: response.data.map(t => ({ id: t.id, name: t.name, lessons: t.lessons.length }))
      });
      
      // Update application state
      setTopics(response.data);
      setConnectionStatus('connected');
      setError(null);
      
      console.log('🎯 Application state updated - topics loaded, connection established');
      
    } catch (err) {
      // Handle and log errors
      console.error('❌ Error fetching topics:', err);
      console.log('🔌 Setting connection status to disconnected');
      
      setConnectionStatus('disconnected');
      setError("Failed to connect to backend. Please check your connection and try again.");
      
      // Log detailed error information for debugging
      if (err instanceof Error) {
        console.error('📝 Error details:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        });
      }
    } finally {
      // Always stop loading regardless of success/failure
      setLoading(false);
      console.log('⏹️ Loading state set to false');
    }
  };

  // ============================================================================
  // EFFECT HOOKS
  // ============================================================================

  /**
   * Initialize the application by fetching topics on component mount
   * 
   * This effect runs once when the component mounts and triggers
   * the initial data load from the backend API.
   */
  useEffect(() => {
    console.log('🔄 App useEffect triggered - initializing data fetch');
    fetchTopics();
  }, []); // Empty dependency array ensures this runs only once on mount

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Handles retry attempts when data fetching fails
   * 
   * Resets the application state and attempts to fetch topics again.
   * This function is called from the ErrorState component.
   */
  const handleRetry = () => {
    console.log('🔄 Retry requested by user');
    console.log('📝 Resetting application state for retry...');
    
    setLoading(true);
    setError(null);
    
    console.log('📡 Initiating retry fetch...');
    fetchTopics();
  };

  /**
   * Tests the connection to the backend API manually
   * 
   * This function performs a direct test of the API connection
   * and provides user feedback through alerts. It's used for
   * troubleshooting connection issues.
   */
  const handleTestConnection = async () => {
    console.log('🧪 Manual connection test initiated by user');
    
    try {
      setConnectionStatus('testing');
      console.log('🔄 Connection status set to testing for manual test');
      
      // Generate test URL using the same logic as API service
      const getTestUrl = () => {
        console.log('🏗️ Building test URL...');
        
        // Check for environment variable first
        if (import.meta.env.VITE_API_BASE_URL) {
          const envUrl = `${import.meta.env.VITE_API_BASE_URL}/topics`;
          console.log('🌍 Using environment API URL:', envUrl);
          return envUrl;
        }
        
        // Auto-detect GitHub Codespaces environment
        const hostname = window.location.hostname;
        console.log('🔍 Current hostname:', hostname);
        
        if (hostname.includes(".github.dev")) {
          const parts = hostname.split('-');
          parts.pop(); // Remove the port part
          const baseCodespace = parts.join('-');
          const codespaceUrl = `https://${baseCodespace}-5000.app.github.dev/api/topics`;
          console.log('🐙 GitHub Codespaces detected, using URL:', codespaceUrl);
          return codespaceUrl;
        }
        
        // Fallback to localhost
        const localhostUrl = "http://localhost:5000/api/topics";
        console.log('🏠 Using localhost URL:', localhostUrl);
        return localhostUrl;
      };
      
      const testUrl = getTestUrl();
      console.log('🎯 Final test URL:', testUrl);
      console.log('📡 Making test request...');
      
      // Perform the actual test
      const response = await fetch(testUrl);
      const data = await response.json();
      
      // Success handling
      setConnectionStatus('connected');
      console.log('✅ Connection test successful:', {
        status: response.status,
        dataCount: data.length,
        url: testUrl
      });
      
      // Show success message to user
      const successMessage = `✅ Connection successful! Found ${data.length} topics.`;
      console.log('🎉 Showing success message to user:', successMessage);
      alert(successMessage);
      
      // Refresh the application data
      console.log('🔄 Refreshing application data after successful test...');
      await fetchTopics();
      
    } catch (error) {
      // Error handling
      setConnectionStatus('disconnected');
      console.error('❌ Connection test failed:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const failureMessage = `❌ Connection failed: ${errorMessage}`;
      
      console.log('⚠️ Showing error message to user:', failureMessage);
      alert(failureMessage);
    }
  };

  /**
   * Handles the start learning action for a specific topic
   * 
   * Currently displays a placeholder message. In future versions,
   * this will navigate to the topic detail page or learning interface.
   * 
   * @param topicId - The unique identifier of the topic to start learning
   */
  const handleStartLearning = (topicId: string) => {
    console.log('🎓 Start learning requested for topic:', topicId);
    
    // Find the topic for logging purposes
    const topic = topics.find(t => t.id === topicId);
    if (topic) {
      console.log('📚 Topic details:', {
        id: topic.id,
        name: topic.name,
        lessonsCount: topic.lessons.length
      });
    }
    
    // TODO: Implement navigation to topic details/learning interface
    const message = `🚀 Starting learning journey for topic ${topicId}!\n\nThis feature will be implemented in the next phase.`;
    console.log('💬 Showing placeholder message to user');
    alert(message);
  };

  // ============================================================================
  // RENDER CONDITIONS
  // ============================================================================

  // Loading State - Show while fetching initial data
  if (loading) {
    console.log('⏳ Rendering loading state');
    return <LoadingState message="Loading your AI learning journey..." />;
  }

  // Error State - Show when data fetching fails
  if (error) {
    console.log('⚠️ Rendering error state:', error);
    return (
      <ErrorState
        message={error}
        onRetry={handleRetry}
        onTestConnection={handleTestConnection}
      />
    );
  }

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  console.log('🎨 Rendering main application UI with:', {
    topicsCount: topics.length,
    connectionStatus,
    sidebarOpen
  });

  // Main Application UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-duogray-50 via-white to-duoblue-50 flex">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
        {/* Header */}
        <Header 
          connectionStatus={connectionStatus}
          topicsCount={topics.length}
          onTestConnection={handleTestConnection}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          isSidebarOpen={sidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {/* Hero Section - Duolingo inspired */}
          <div className="text-center mb-12">
            <div className="mb-8">
              {/* Main heading with Duolingo-style gradient */}
              <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-duogreen-600 via-duoblue-600 to-duopurple-600">
                  Learn AI & ML
                </span>
              </h1>
              
              {/* Subtitle with playful emoji */}
              <p className="text-xl text-duogray-600 max-w-3xl mx-auto leading-relaxed font-medium mb-6">
                🚀 Master artificial intelligence through fun, interactive lessons designed by AI pioneers. 
                Build real skills with hands-on projects! 🧠✨
              </p>
            </div>
            
            {/* CTA Button - Duolingo style */}
            <div className="mb-8">
              <button className="bg-gradient-to-r from-duogreen-500 to-duoblue-500 hover:from-duogreen-600 hover:to-duoblue-600 text-white font-black px-8 py-4 rounded-2xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-white">
                🎯 Start Learning Today
              </button>
            </div>
            
            {/* Fun stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-duogreen-50 border-2 border-duogreen-200 rounded-2xl p-4 transform hover:scale-105 transition-transform duration-200">
                <div className="text-duogreen-600 font-black text-2xl mb-1">🏆 10K+</div>
                <div className="text-duogreen-700 font-semibold text-sm">Happy Learners</div>
              </div>
              <div className="bg-duoblue-50 border-2 border-duoblue-200 rounded-2xl p-4 transform hover:scale-105 transition-transform duration-200">
                <div className="text-duoblue-600 font-black text-2xl mb-1">⚡ 95%</div>
                <div className="text-duoblue-700 font-semibold text-sm">Success Rate</div>
              </div>
              <div className="bg-duopurple-50 border-2 border-duopurple-200 rounded-2xl p-4 transform hover:scale-105 transition-transform duration-200">
                <div className="text-duopurple-600 font-black text-2xl mb-1">🎓 50+</div>
                <div className="text-duopurple-700 font-semibold text-sm">Expert Courses</div>
              </div>
            </div>
          </div>

          {/* Topics Section - Duolingo inspired */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black text-duogray-800 mb-4">
                🌟 Popular Courses
              </h2>
              <p className="text-lg text-duogray-600 max-w-2xl mx-auto font-medium">
                Start your AI journey with these engaging, bite-sized courses! 🚀
              </p>
            </div>

            {topics.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {topics.map((topic) => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    onStartLearning={handleStartLearning}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                {/* Empty state with Duolingo styling */}
                <div className="bg-gradient-to-br from-duoyellow-50 to-duogreen-50 border-2 border-duoyellow-200 rounded-3xl p-12 max-w-lg mx-auto">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-black text-duogray-800 mb-3">No courses available yet!</h3>
                  <p className="text-duogray-600 font-medium mb-6">
                    Our amazing courses are being prepared. Check back soon! 
                  </p>
                  <button 
                    onClick={handleRetry}
                    className="bg-duoyellow-400 hover:bg-duoyellow-500 text-duoyellow-900 font-black px-6 py-3 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    🔄 Refresh
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Educational Info Section - Duolingo inspired */}
          <div className="border-t-2 border-duogray-100 pt-12 mt-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-black text-duogray-800 mb-3">
                🎯 Why Choose FunLabs?
              </h3>
              <p className="text-duogray-600 font-medium">
                Learning made fun, engaging, and effective! 
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Expert Learning */}
              <div className="bg-duogreen-50 border-2 border-duogreen-200 rounded-3xl p-6 text-center transform hover:scale-105 transition-all duration-200 hover:shadow-lg">
                <div className="w-16 h-16 bg-duogreen-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">🧠</span>
                </div>
                <h4 className="font-black text-duogreen-800 mb-3 text-lg">Expert-Led Learning</h4>
                <p className="text-sm text-duogreen-700 leading-relaxed font-medium">
                  Learn from AI pioneers through fun, bite-sized lessons that stick! 🚀
                </p>
              </div>
              
              {/* Hands-On Projects */}
              <div className="bg-duoblue-50 border-2 border-duoblue-200 rounded-3xl p-6 text-center transform hover:scale-105 transition-all duration-200 hover:shadow-lg">
                <div className="w-16 h-16 bg-duoblue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">⚡</span>
                </div>
                <h4 className="font-black text-duoblue-800 mb-3 text-lg">Hands-On Projects</h4>
                <p className="text-sm text-duoblue-700 leading-relaxed font-medium">
                  Build real apps and gain experience through interactive coding! 💻
                </p>
              </div>
              
              {/* Career Growth */}
              <div className="bg-duopurple-50 border-2 border-duopurple-200 rounded-3xl p-6 text-center transform hover:scale-105 transition-all duration-200 hover:shadow-lg">
                <div className="w-16 h-16 bg-duopurple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">🏆</span>
                </div>
                <h4 className="font-black text-duopurple-800 mb-3 text-lg">Career Growth</h4>
                <p className="text-sm text-duopurple-700 leading-relaxed font-medium">
                  Advance your career with skills that employers love! 📈
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

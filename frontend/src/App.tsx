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
 * - Fun and engaging design with vibrant colors and animations
 * 
 * @author FunLabs Team
 * @version 2.0.0 - Fun Learning Edition
 */

import { useEffect, useState } from "react";
import type { Topic } from "./services/api";
import { topicsApi } from "./services/api";
import { Header } from "./components/Header";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { TopicCard } from "./components/TopicCard";
import { Sidebar } from "./components/Sidebar";
import { Practice } from "./components/Practice";
import { Leaderboards } from "./components/Leaderboards";
import { Profile } from "./components/Profile";
import "./App.css";

function App() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'testing'>('disconnected');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>('dashboard');

  // ============================================================================
  // DATA FETCHING
  // ============================================================================

  const fetchTopics = async () => {
    try {
      console.log('📡 Initiating topics fetch...');
      console.log('🌍 API URL being used:', window.location.hostname);
      setConnectionStatus('testing');
      
      const response = await topicsApi.getAll();
      const topics = response.data;
      console.log('📊 Raw API response:', response);
      console.log('📊 Topics data:', topics);
      console.log('📊 Data type:', typeof topics);
      console.log('📊 Is array:', Array.isArray(topics));
      console.log('📊 Array length:', topics?.length || 'undefined');
      
      setTopics(topics);
      setConnectionStatus('connected');
      setError(null);
      
      console.log('🎯 Topics state updated, length:', topics.length);
    } catch (err) {
      console.error('❌ Error fetching topics:', err);
      setConnectionStatus('disconnected');
      setError("Failed to connect to backend. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🔄 App initialized - fetching data...');
    fetchTopics();
  }, []);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleRetry = () => {
    console.log('🔄 Retry requested');
    setLoading(true);
    setError(null);
    fetchTopics();
  };

  const handleTestConnection = async () => {
    console.log('🧪 Manual connection test initiated');
    
    try {
      setConnectionStatus('testing');
      const response = await topicsApi.getAll();
      const topics = response.data;
      setConnectionStatus('connected');
      
      alert(`✅ Connection successful! Found ${topics.length} topics.`);
      await fetchTopics();
    } catch (error) {
      setConnectionStatus('disconnected');
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`❌ Connection failed: ${errorMessage}`);
    }
  };

  const handleStartLearning = (topicId: string) => {
    console.log('🎓 Start learning requested for topic:', topicId);
    alert(`🚀 Starting learning journey for topic ${topicId}!\n\nThis feature will be implemented in the next phase.`);
  };

  const handleNavigation = (section: string) => {
    console.log(`🧭 Navigating to section: ${section}`);
    setCurrentSection(section);
  };

  // ============================================================================
  // RENDER CONDITIONS
  // ============================================================================

  if (loading) {
    return <LoadingState message="Loading your AI learning journey..." />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={handleRetry}
        onTestConnection={handleTestConnection}
      />
    );
  }

  // ============================================================================
  // MAIN RENDER - DUOLINGO INSPIRED
  // ============================================================================

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Sidebar - Overlay positioned */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
        onNavigate={handleNavigation}
        currentSection={currentSection}
      />

      {/* Main Content Area - Fixed width, no shifting */}
      <div className="flex flex-col min-h-screen">
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
          {currentSection === 'dashboard' && (
            <>
              {/* Hero Section - Duolingo inspired */}
              <div className="text-center mb-12">
                <div className="mb-8">
                  <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400">
                      Learn AI & ML
                    </span>
                  </h1>
                  
                  <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium mb-6">
                    🚀 Master artificial intelligence through fun, interactive lessons! 
                    A simple, engaging way to learn complex concepts. 🧠✨
                  </p>
                </div>
                
                <div className="mb-8">
                  <button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-black px-8 py-4 rounded-2xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-white duo-button">
                    🎯 Start Learning Today
                  </button>
                </div>
              </div>

              {/* Topics Section */}
              <div className="mb-16">
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-black text-white mb-4">
                    🌟 Available Courses
                  </h2>
                  <p className="text-lg text-gray-400 max-w-2xl mx-auto font-medium">
                    Start your AI journey with these fun, bite-sized courses! 🚀
                  </p>
                </div>

                {topics.length > 0 ? (
                  <div className="flex justify-center">
                    <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
                      {topics.map((topic) => (
                        <TopicCard
                          key={topic.id}
                          topic={topic}
                          onStartLearning={handleStartLearning}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-slate-800 border-2 border-yellow-600 rounded-3xl p-12 max-w-lg mx-auto fun-card">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-2xl font-black text-white mb-3">No courses available yet!</h3>
                      <p className="text-gray-400 font-medium mb-6">
                        Our amazing courses are being prepared. Check back soon! 
                      </p>
                      <button 
                        onClick={handleRetry}
                        className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900 font-black px-6 py-3 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl duo-button"
                      >
                        🔄 Refresh
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {currentSection === 'learn-ai' && (
            <>
              {/* Topics Section for Learn AI */}
              <div className="mb-16">
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-black text-white mb-4">
                    🤖 Learn AI
                  </h2>
                  <p className="text-lg text-gray-400 max-w-2xl mx-auto font-medium">
                    Master AI fundamentals with interactive lessons! 🎓
                  </p>
                </div>

                {topics.length > 0 ? (
                  <div className="flex justify-center">
                    <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
                      {topics.map((topic) => (
                        <TopicCard
                          key={topic.id}
                          topic={topic}
                          onStartLearning={handleStartLearning}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-slate-800 border-2 border-yellow-600 rounded-3xl p-12 max-w-lg mx-auto fun-card">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-2xl font-black text-white mb-3">No courses available yet!</h3>
                      <p className="text-gray-400 font-medium mb-6">
                        Our amazing AI courses are being prepared. Check back soon! 
                      </p>
                      <button 
                        onClick={handleRetry}
                        className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900 font-black px-6 py-3 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl duo-button"
                      >
                        🔄 Refresh
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {currentSection === 'practice' && <Practice />}
          {currentSection === 'leaderboards' && <Leaderboards />}
          {currentSection === 'profile' && <Profile />}
          {currentSection === 'settings' && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">⚙️</div>
              <h2 className="text-4xl font-black text-white mb-4">Settings</h2>
              <p className="text-lg text-gray-400">Settings panel coming soon!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;

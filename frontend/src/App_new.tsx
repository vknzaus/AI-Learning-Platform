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
 * - Duolingo-inspired design with vibrant colors and animations
 * 
 * @author FunLabs Team
 * @version 2.0.0 - Duolingo Inspired Edition
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

function App() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'testing'>('disconnected');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ============================================================================
  // DATA FETCHING
  // ============================================================================

  const fetchTopics = async () => {
    try {
      console.log('📡 Initiating topics fetch...');
      setConnectionStatus('testing');
      
      const response = await topicsApi.getAll();
      setTopics(response.data);
      setConnectionStatus('connected');
      setError(null);
      
      console.log('🎯 Topics loaded successfully:', response.data.length);
      console.log('🔗 Connection status:', connectionStatus);
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
      setConnectionStatus('connected');
      
      alert(`✅ Connection successful! Found ${response.data.length} topics.`);
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
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          isSidebarOpen={sidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {/* Hero Section - Duolingo inspired */}
          <div className="text-center mb-12">
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-duogreen-600 via-duoblue-600 to-duopurple-600">
                  Learn AI & ML
                </span>
              </h1>
              
              <p className="text-xl text-duogray-600 max-w-3xl mx-auto leading-relaxed font-medium mb-6">
                🚀 Master artificial intelligence through fun, interactive lessons designed by AI pioneers. 
                Build real skills with hands-on projects! 🧠✨
              </p>
            </div>
            
            <div className="mb-8">
              <button className="bg-gradient-to-r from-duogreen-500 to-duoblue-500 hover:from-duogreen-600 hover:to-duoblue-600 text-white font-black px-8 py-4 rounded-2xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-white duo-button">
                🎯 Start Learning Today
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-duogreen-50 border-2 border-duogreen-200 rounded-2xl p-4 transform hover:scale-105 transition-transform duration-200 fun-card">
                <div className="text-duogreen-600 font-black text-2xl mb-1">🏆 10K+</div>
                <div className="text-duogreen-700 font-semibold text-sm">Happy Learners</div>
              </div>
              <div className="bg-duoblue-50 border-2 border-duoblue-200 rounded-2xl p-4 transform hover:scale-105 transition-transform duration-200 fun-card">
                <div className="text-duoblue-600 font-black text-2xl mb-1">⚡ 95%</div>
                <div className="text-duoblue-700 font-semibold text-sm">Success Rate</div>
              </div>
              <div className="bg-duopurple-50 border-2 border-duopurple-200 rounded-2xl p-4 transform hover:scale-105 transition-transform duration-200 fun-card">
                <div className="text-duopurple-600 font-black text-2xl mb-1">🎓 50+</div>
                <div className="text-duopurple-700 font-semibold text-sm">Expert Courses</div>
              </div>
            </div>
          </div>

          {/* Topics Section */}
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
                <div className="bg-gradient-to-br from-duoyellow-50 to-duogreen-50 border-2 border-duoyellow-200 rounded-3xl p-12 max-w-lg mx-auto fun-card">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-black text-duogray-800 mb-3">No courses available yet!</h3>
                  <p className="text-duogray-600 font-medium mb-6">
                    Our amazing courses are being prepared. Check back soon! 
                  </p>
                  <button 
                    onClick={handleRetry}
                    className="bg-duoyellow-400 hover:bg-duoyellow-500 text-duoyellow-900 font-black px-6 py-3 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl duo-button"
                  >
                    🔄 Refresh
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Benefits Section */}
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
              <div className="bg-duogreen-50 border-2 border-duogreen-200 rounded-3xl p-6 text-center fun-card">
                <div className="w-16 h-16 bg-duogreen-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">🧠</span>
                </div>
                <h4 className="font-black text-duogreen-800 mb-3 text-lg">Expert-Led Learning</h4>
                <p className="text-sm text-duogreen-700 leading-relaxed font-medium">
                  Learn from AI pioneers through fun, bite-sized lessons that stick! 🚀
                </p>
              </div>
              
              <div className="bg-duoblue-50 border-2 border-duoblue-200 rounded-3xl p-6 text-center fun-card">
                <div className="w-16 h-16 bg-duoblue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">⚡</span>
                </div>
                <h4 className="font-black text-duoblue-800 mb-3 text-lg">Hands-On Projects</h4>
                <p className="text-sm text-duoblue-700 leading-relaxed font-medium">
                  Build real apps and gain experience through interactive coding! 💻
                </p>
              </div>
              
              <div className="bg-duopurple-50 border-2 border-duopurple-200 rounded-3xl p-6 text-center fun-card">
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

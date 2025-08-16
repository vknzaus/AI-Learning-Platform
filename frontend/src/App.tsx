import { useEffect, useState } from "react";
import type { Topic } from "./services/api";
import { topicsApi } from "./services/api";
import "./App.css";

function App() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        console.log("Fetching topics from backend...");
        const response = await topicsApi.getAll();
        console.log("Topics received:", response.data);
        setTopics(response.data);
      } catch (err) {
        setError("Failed to connect to backend. Check console for details.");
        console.error("Error fetching topics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading AI Learning Platform...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Connection Error
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 mr-2"
          >
            Try Again
          </button>
          <button
            onClick={() => {
              const testUrl = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api"}/topics`;
              fetch(testUrl)
                .then((response) => response.json())
                .then((data) => {
                  console.log("Manual test success:", data);
                  alert(`Success! Got ${data.length} topics`);
                })
                .catch((error) => {
                  console.error("Manual test failed:", error);
                  alert(`Failed: ${error.message}`);
                });
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Test Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="text-3xl mr-3">🤖</div>
              <h1 className="text-3xl font-bold text-gray-900">
                AI Learning Platform
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-primary-600 px-3 py-2">
                Sign In
              </button>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Learn AI Concepts in Bite-Sized Lessons
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master artificial intelligence through interactive questions,
            real-world examples, and adaptive learning paths designed for all
            skill levels.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-primary-600">
              {topics.length}
            </div>
            <div className="text-gray-600">Learning Topics</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-primary-600">
              {topics.reduce((acc, topic) => acc + topic.lessons.length, 0)}
            </div>
            <div className="text-gray-600">Interactive Lessons</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-primary-600">7</div>
            <div className="text-gray-600">Question Types</div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Start Your Learning Journey
          </h3>

          {topics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="text-2xl mr-3">
                        {topic.name.includes("AI") ? "🤖" : "🧠"}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {topic.name}
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-4 text-sm">
                      {topic.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-1">📚</span>
                        <span>
                          {topic.lessons.length} lesson
                          {topic.lessons.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700 transition-colors">
                        Start Learning
                      </button>
                    </div>

                    {/* Lessons Preview */}
                    {topic.lessons.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="text-xs text-gray-500 mb-2">
                          Lessons:
                        </div>
                        {topic.lessons.slice(0, 2).map((lesson) => (
                          <div
                            key={lesson.id}
                            className="text-sm text-gray-600 mb-1"
                          >
                            • {lesson.title}
                          </div>
                        ))}
                        {topic.lessons.length > 2 && (
                          <div className="text-xs text-gray-400">
                            +{topic.lessons.length - 2} more lessons
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <p className="text-gray-500 text-lg">No topics available yet.</p>
              <p className="text-gray-400 text-sm">
                Check if your backend is running.
              </p>
            </div>
          )}
        </div>

        {/* Backend Status */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <div className="text-sm text-gray-600">
            <strong>Backend Status:</strong>{" "}
            {topics.length > 0 ? "✅ Connected" : "❌ Not Connected"}
            {topics.length > 0 && (
              <span className="ml-4">
                • Loaded {topics.length} topics with{" "}
                {topics.reduce((acc, topic) => acc + topic.lessons.length, 0)}{" "}
                lessons
              </span>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDemoAccounts, setShowDemoAccounts] = useState(true);

  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await signIn(username, password);
      if (success) {
        onClose();
        setUsername("");
        setPassword("");
      } else {
        setError("Invalid username or password. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (
    demoUsername: string,
    demoPassword: string
  ) => {
    setUsername(demoUsername);
    setPassword(demoPassword);
    setIsLoading(true);
    setError("");

    try {
      const success = await signIn(demoUsername, demoPassword);
      if (success) {
        onClose();
      }
    } catch {
      setError("Demo login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
          disabled={isLoading}
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">🚀</div>
          <h2 className="text-2xl font-black text-white mb-2">Welcome Back!</h2>
          <p className="text-gray-400 text-sm">
            Sign in to continue your AI learning journey
          </p>
        </div>

        {/* Demo Accounts Section */}
        {showDemoAccounts && (
          <div className="mb-6 p-4 bg-slate-700 rounded-xl border border-slate-600">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-bold text-sm">🎯 Demo Accounts</h3>
              <button
                onClick={() => setShowDemoAccounts(false)}
                className="text-gray-400 hover:text-white text-sm"
              >
                Hide
              </button>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => handleDemoLogin("demo", "demo123")}
                className="w-full text-left p-3 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors"
                disabled={isLoading}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">👨‍💻</span>
                  <div>
                    <div className="text-white font-medium text-sm">
                      Demo User
                    </div>
                    <div className="text-gray-400 text-xs">demo / demo123</div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-blue-400 text-xs">💎 250</div>
                    <div className="text-red-400 text-xs">❤️ 5</div>
                  </div>
                </div>
              </button>
              <button
                onClick={() => handleDemoLogin("student", "student123")}
                className="w-full text-left p-3 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors"
                disabled={isLoading}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">👩‍🎓</span>
                  <div>
                    <div className="text-white font-medium text-sm">
                      Student
                    </div>
                    <div className="text-gray-400 text-xs">
                      student / student123
                    </div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-blue-400 text-xs">💎 180</div>
                    <div className="text-red-400 text-xs">❤️ 4</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter your username"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold py-3 text-base rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Demo app • Use any of the demo accounts above
          </p>
        </div>
      </div>
    </div>
  );
};

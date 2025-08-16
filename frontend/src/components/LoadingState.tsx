import { LoadingSpinner } from "./ui";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({
  message = "Loading AI Learning Platform...",
}: LoadingStateProps) => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        {/* Loading Animation */}
        <div className="mb-8">
          <div className="relative">
            <LoadingSpinner size="lg" className="mx-auto" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl animate-pulse">🤖</div>
            </div>
          </div>
        </div>

        {/* Loading Message */}
        <div className="space-y-2">
          <p className="text-lg font-medium text-white">{message}</p>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>

        {/* Subtle progress indication */}
        <div className="mt-8 max-w-xs mx-auto">
          <div className="bg-slate-700 rounded-full h-1">
            <div
              className="bg-teal-500 h-1 rounded-full animate-pulse"
              style={{ width: "60%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

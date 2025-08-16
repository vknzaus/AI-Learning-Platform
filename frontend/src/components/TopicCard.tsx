/**
 * FunLabs TopicCard Component - Duolingo-inspired design
 *
 * A vibrant, engaging course card that captures the playful spirit of learning.
 * Features colorful gradients, smooth animations, and encouraging messaging.
 */

import type { Topic } from "../services/api";
import { Button } from "./ui";

interface TopicCardProps {
  topic: Topic;
  onStartLearning?: (topicId: string) => void;
}

export const TopicCard = ({ topic, onStartLearning }: TopicCardProps) => {
  const getTopicIcon = (name: string) => {
    if (
      name.toLowerCase().includes("ai") ||
      name.toLowerCase().includes("artificial")
    )
      return "🤖";
    if (
      name.toLowerCase().includes("machine learning") ||
      name.toLowerCase().includes("ml")
    )
      return "🧠";
    if (name.toLowerCase().includes("neural")) return "🧬";
    if (name.toLowerCase().includes("data")) return "📊";
    if (name.toLowerCase().includes("deep learning")) return "🔬";
    return "💡";
  };

  const getTopicColor = (name: string) => {
    if (
      name.toLowerCase().includes("ai") ||
      name.toLowerCase().includes("artificial")
    )
      return "blue";
    if (
      name.toLowerCase().includes("machine learning") ||
      name.toLowerCase().includes("ml")
    )
      return "green";
    if (name.toLowerCase().includes("neural")) return "purple";
    if (name.toLowerCase().includes("data")) return "yellow";
    if (name.toLowerCase().includes("deep learning")) return "red";
    return "blue";
  };

  const color = getTopicColor(topic.name);
  const gradients = {
    blue: "from-duoblue-400 to-duoblue-600",
    green: "from-duogreen-400 to-duogreen-600",
    purple: "from-duopurple-400 to-duopurple-600",
    yellow: "from-duoyellow-400 to-duoyellow-600",
    red: "from-duored-400 to-duored-600",
  };

  const borderColors = {
    blue: "border-duoblue-200 hover:border-duoblue-300",
    green: "border-duogreen-200 hover:border-duogreen-300",
    purple: "border-duopurple-200 hover:border-duopurple-300",
    yellow: "border-duoyellow-200 hover:border-duoyellow-300",
    red: "border-duored-200 hover:border-duored-300",
  };

  return (
    <div
      className={`
      bg-slate-800 border-2 ${borderColors[color]} 
      rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 
      transform hover:-translate-y-2 hover:scale-105 group cursor-pointer
      shadow-lg border-slate-700 hover:border-slate-600
    `}
    >
      {/* Course Header Section */}
      <div
        className={`bg-gradient-to-br ${gradients[color]} h-32 flex items-center justify-center relative overflow-hidden`}
      >
        {/* Decorative circles */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-20 rounded-full"></div>
        <div className="absolute bottom-3 left-3 w-4 h-4 bg-white bg-opacity-20 rounded-full"></div>
        <div className="absolute top-6 left-8 w-2 h-2 bg-white bg-opacity-30 rounded-full"></div>

        <div className="text-6xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 filter drop-shadow-lg">
          {getTopicIcon(topic.name)}
        </div>
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-slate-700 text-teal-300 border border-slate-600 font-bold px-3 py-1 rounded-full text-xs">
              🚀 Beginner Friendly
            </div>
            <div className="text-sm font-bold px-3 py-1 rounded-full bg-slate-700 text-gray-300">
              📚 {topic.lessons.length} lesson
              {topic.lessons.length !== 1 ? "s" : ""}
            </div>
          </div>
          <h3 className="text-xl font-black text-white mb-2 group-hover:text-teal-300 transition-colors line-clamp-2">
            {topic.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed font-medium">
          {topic.description ||
            "🎯 Master the fundamentals with fun, bite-sized lessons! Build amazing projects and unlock your potential with our expert-crafted curriculum. ✨"}
        </p>

        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-gray-400">
              Ready to start!
            </span>
            <span className="text-xs font-bold text-teal-400">0% Complete</span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-400 to-blue-400 h-2 rounded-full w-0 group-hover:w-1/4 transition-all duration-1000"></div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          className={`
            w-full bg-gradient-to-r ${gradients[color]} hover:brightness-110
            text-white font-black py-4 rounded-2xl text-base
            transition-all duration-200 shadow-lg hover:shadow-xl
            transform hover:scale-105 border-2 border-white
            active:scale-95
          `}
          onClick={() => onStartLearning?.(topic.id)}
        >
          <span className="flex items-center justify-center">
            🎯 Start Learning
            <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">
              →
            </span>
          </span>
        </Button>

        {/* Fun encouragement */}
        <p className="text-center text-xs text-gray-400 mt-3 font-medium">
          🌟 Join thousands of happy learners!
        </p>
      </div>
    </div>
  );
};

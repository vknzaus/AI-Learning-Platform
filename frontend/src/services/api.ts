// Get API base URL from environment variables with fallback
// Auto-detect GitHub Codespaces environment
const getApiBaseUrl = () => {
  // If we have an environment variable, use it
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // Auto-detect GitHub Codespaces
  const hostname = window.location.hostname;
  if (hostname.includes('.github.dev')) {
    // Extract the codespace identifier and create backend URL
    const codespaceName = hostname.split('.')[0];
    return `https://${codespaceName}-5000.app.github.dev/api`;
  }
  
  // Default to localhost
  return "http://localhost:5000/api";
};

const API_BASE_URL = getApiBaseUrl();

console.log("API Configuration loaded");
console.log("Base URL:", API_BASE_URL);
console.log("Current hostname:", window.location.hostname);

export interface Topic {
  id: string;
  name: string;
  description?: string;
  orderIndex: number;
  createdAt: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  description?: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  orderIndex: number;
  prerequisites: string[];
  createdAt: string;
}

export const topicsApi = {
  getAll: async (): Promise<{ data: Topic[] }> => {
    try {
      const url = `${API_BASE_URL}/topics`;
      console.log("Fetching from:", url);
      console.log("Current window location:", window.location.href);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Received data:", data);
      return { data };
    } catch (error) {
      console.error("Fetch error:", error);
      console.error("Error details:", {
        message: error instanceof Error ? error.message : 'Unknown error',
        name: error instanceof Error ? error.name : 'Unknown',
        stack: error instanceof Error ? error.stack : undefined
      });
      throw error;
    }
  },
};

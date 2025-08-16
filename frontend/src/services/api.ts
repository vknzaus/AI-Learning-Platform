import axios from "axios";

// Use port 8000 since it's accessible
const API_BASE_URL =
  "https://refactored-chainsaw-wr4q59974jxxcv5pg-8000.app.github.dev/api";

console.log("API_BASE_URL:", API_BASE_URL);

console.log("Computed API_BASE_URL:", API_BASE_URL);
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
      console.log("Fetching from:", `${API_BASE_URL}/topics`);

      const response = await fetch(`${API_BASE_URL}/topics`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received data:", data);
      return { data };
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  },
};

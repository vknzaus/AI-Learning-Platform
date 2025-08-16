import { getApiUrl } from "../config/api";

console.log("API Configuration loaded");
console.log("Base URL:", getApiUrl(""));
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
      const url = getApiUrl("/topics");
      console.log("Fetching from:", url);

      const response = await fetch(url, {
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

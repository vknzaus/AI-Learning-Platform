/**
 * FunLabs API Service
 * 
 * This module handles all communication with the backend API.
 * It provides a centralized way to manage API calls, handle responses,
 * and manage different environments (development, production, Codespaces).
 * 
 * Key Features:
 * - Automatic environment detection
 * - GitHub Codespaces support
 * - Type-safe API responses
 * - Comprehensive error logging
 * - Flexible configuration
 * 
 * @author FunLabs Team
 * @version 1.0.0
 */

// ============================================================================
// ENVIRONMENT DETECTION & CONFIGURATION
// ============================================================================

/**
 * Determines the appropriate API base URL based on the current environment
 * 
 * Priority order:
 * 1. VITE_API_BASE_URL environment variable (highest priority)
 * 2. GitHub Codespaces auto-detection
 * 3. Localhost fallback (development)
 * 
 * @returns The base URL for API calls
 */
const getApiBaseUrl = () => {
  console.log('🔍 FunLabs API: Determining base URL...');
  
  // If we have an environment variable, use it (highest priority)
  if (import.meta.env.VITE_API_BASE_URL) {
    const envUrl = import.meta.env.VITE_API_BASE_URL;
    console.log('🌍 Using environment variable API URL:', envUrl);
    return envUrl;
  }

  // Auto-detect GitHub Codespaces environment
  const hostname = window.location.hostname;
  console.log('🖥️ Current hostname:', hostname);
  
  if (hostname.includes(".github.dev")) {
    console.log('🐙 GitHub Codespaces environment detected');
    
    // Extract the codespace identifier (remove port from hostname)
    // Format: codespace-name-port.app.github.dev -> codespace-name-5000.app.github.dev
    const parts = hostname.split("-");
    const removedPart = parts.pop(); // removes "5173.app.github.dev" or similar
    const baseCodespace = parts.join("-"); // rejoins the base identifier
    const backendUrl = `https://${baseCodespace}-5000.app.github.dev/api`;
    
    console.log('🔗 Codespaces URL construction:', {
      originalHostname: hostname,
      splitParts: parts,
      removedPart: removedPart,
      baseCodespace: baseCodespace,
      finalBackendUrl: backendUrl
    });
    
    return backendUrl;
  }

  // Default to localhost for local development
  const localhostUrl = "http://localhost:5000/api";
  console.log('🏠 Using localhost development URL:', localhostUrl);
  return localhostUrl;
};

// Initialize API base URL
const API_BASE_URL = getApiBaseUrl();

// Log configuration details for debugging
console.log("🚀 FunLabs API Service initialized");
console.log("📍 Base URL:", API_BASE_URL);
console.log("🌐 Current hostname:", window.location.hostname);
console.log("🏷️ Detected environment:", 
  window.location.hostname.includes(".github.dev")
    ? "GitHub Codespaces"
    : "Local development"
);

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Represents a learning topic/course in the FunLabs platform
 */
export interface Topic {
  /** Unique identifier for the topic */
  id: string;
  /** Display name of the topic (e.g., "Machine Learning Fundamentals") */
  name: string;
  /** Optional detailed description of the topic */
  description?: string;
  /** Numeric order for display sorting */
  orderIndex: number;
  /** ISO timestamp when the topic was created */
  createdAt: string;
  /** Array of lessons contained within this topic */
  lessons: Lesson[];
}

/**
 * Represents a single lesson within a learning topic
 */
export interface Lesson {
  /** Unique identifier for the lesson */
  id: string;
  /** ID of the parent topic this lesson belongs to */
  topicId: string;
  /** Display title of the lesson */
  title: string;
  /** Optional detailed description of lesson content */
  description?: string;
  /** Difficulty level classification */
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  /** Numeric order for display within the topic */
  orderIndex: number;
  /** Array of prerequisite lesson IDs */
  prerequisites: string[];
  /** ISO timestamp when the lesson was created */
  createdAt: string;
}

// ============================================================================
// API SERVICE IMPLEMENTATION
// ============================================================================

/**
 * Topics API service - handles all topic-related API calls
 * 
 * This service provides methods to interact with the topics endpoint
 * and includes comprehensive logging for debugging purposes.
 */
export const topicsApi = {
  /**
   * Fetches all available learning topics from the backend
   * 
   * This method:
   * 1. Constructs the API URL
   * 2. Makes a CORS-enabled GET request
   * 3. Handles response validation
   * 4. Provides detailed error logging
   * 5. Returns typed topic data
   * 
   * @returns Promise containing array of Topic objects
   * @throws Error when request fails or response is invalid
   */
  getAll: async (): Promise<{ data: Topic[] }> => {
    const methodName = 'topicsApi.getAll';
    console.log(`📡 ${methodName}: Starting request...`);
    
    try {
      // Construct the full API URL
      const url = `${API_BASE_URL}/topics`;
      console.log(`🌐 ${methodName}: Target URL:`, url);
      console.log(`🔍 ${methodName}: Current location:`, window.location.href);

      // Make the HTTP request with proper headers and CORS settings
      console.log(`📤 ${methodName}: Making fetch request...`);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors", // Enable CORS for cross-origin requests
      });

      // Log response details
      console.log(`📥 ${methodName}: Response received`, {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });

      // Check if response is successful
      if (!response.ok) {
        const errorMessage = `HTTP error! status: ${response.status} - ${response.statusText}`;
        console.error(`❌ ${methodName}: ${errorMessage}`);
        throw new Error(errorMessage);
      }

      // Parse JSON response
      console.log(`🔄 ${methodName}: Parsing JSON response...`);
      const data = await response.json();
      
      // Log successful data retrieval
      console.log(`✅ ${methodName}: Successfully retrieved data:`, {
        topicCount: data.length,
        topics: data.map((topic: Topic) => ({
          id: topic.id,
          name: topic.name,
          lessonCount: topic.lessons.length
        }))
      });
      
      return { data };
      
    } catch (error) {
      // Comprehensive error logging
      console.error(`❌ ${methodName}: Request failed:`, error);
      console.error(`📋 ${methodName}: Error details:`, {
        message: error instanceof Error ? error.message : "Unknown error",
        name: error instanceof Error ? error.name : "Unknown",
        stack: error instanceof Error ? error.stack : undefined,
        apiBaseUrl: API_BASE_URL,
        currentUrl: window.location.href
      });
      
      // Re-throw the error for upstream handling
      throw error;
    }
  },
};

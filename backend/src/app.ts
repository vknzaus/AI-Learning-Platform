/**
 * FunLabs AI Learning Platform - Express Application Configuration
 *
 * This file configures the main Express.js application with all necessary
 * middleware, security settings, CORS configuration, and route handlers.
 * It serves as the central hub for the backend API server.
 *
 * Key Features:
 * - CORS configuration for frontend communication
 * - Security middleware (Helmet)
 * - Request logging (Morgan)
 * - JSON request parsing
 * - Database integration (Prisma)
 * - Health check endpoints
 * - Topic management API
 * - Error handling middleware
 *
 * @author FunLabs Team
 * @version 1.0.0
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
// @ts-ignore - morgan types issue in development
import morgan from "morgan";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

// ============================================================================
// ENVIRONMENT & DATABASE SETUP
// ============================================================================

// Load environment variables from .env file
console.log("🔧 Loading environment configuration...");
dotenv.config();

// Initialize Prisma client for database operations
console.log("🗄️ Initializing Prisma database client...");
export const prisma = new PrismaClient();

// Log database connection status
console.log("✅ Database client initialized successfully");

// Create Express application instance
console.log("🚀 Creating Express application...");
const app = express();

// ============================================================================
// CORS CONFIGURATION
// ============================================================================

/**
 * CORS (Cross-Origin Resource Sharing) configuration
 *
 * Defines which frontend origins are allowed to make requests to this API.
 * Supports both development environments and GitHub Codespaces.
 */
console.log("🔒 Configuring CORS settings...");

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [
      // Local development URLs
      "http://localhost:3000",
      "http://localhost:5173",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:5173",
      // GitHub Codespaces pattern matching
      /https:\/\/.*\.github\.dev/,
    ];

console.log("📋 Allowed CORS origins:", allowedOrigins);

// ============================================================================
// MIDDLEWARE CONFIGURATION
// ============================================================================

/**
 * Configure CORS middleware with dynamic origin checking
 *
 * This middleware:
 * 1. Allows requests from configured origins
 * 2. Supports regex patterns for dynamic URLs (Codespaces)
 * 3. Logs CORS decisions for debugging
 * 4. Enables credentials for authenticated requests
 */
console.log("🌐 Setting up CORS middleware...");

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl requests, or Postman)
      if (!origin) {
        console.log("🔓 CORS: Allowing request with no origin");
        return callback(null, true);
      }

      console.log("🔍 CORS: Checking origin:", origin);

      // Check if the origin is allowed
      const isAllowed = allowedOrigins.some((allowedOrigin) => {
        if (typeof allowedOrigin === "string") {
          const match = allowedOrigin === origin;
          if (match) console.log("✅ CORS: String match found:", allowedOrigin);
          return match;
        } else {
          // Handle regex patterns for dynamic URLs (GitHub Codespaces)
          const match = allowedOrigin.test(origin);
          if (match) console.log("✅ CORS: Regex match found:", allowedOrigin);
          return match;
        }
      });

      if (isAllowed) {
        console.log("🎯 CORS: Origin allowed, proceeding with request");
        callback(null, true);
      } else {
        console.log("❌ CORS: Origin rejected:", origin);
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Enable cookies and authorization headers
  })
);

/**
 * Request body parsing middleware
 *
 * Configures Express to parse:
 * 1. JSON payloads up to 10MB
 * 2. URL-encoded form data
 */
console.log("📦 Setting up body parsing middleware...");
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/**
 * HTTP request logging middleware using Morgan
 *
 * Only enabled in non-test environments for performance.
 * Uses 'combined' format for comprehensive request logging.
 */
console.log("📊 Setting up request logging middleware...");
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
  console.log("✅ Morgan logging enabled (combined format)");
} else {
  console.log("⏭️ Morgan logging disabled in test environment");
}

// ============================================================================
// HEALTH CHECK ENDPOINT
// ============================================================================

/**
 * Health check endpoint for monitoring application status
 *
 * This endpoint:
 * 1. Tests database connectivity
 * 2. Returns application metadata
 * 3. Provides monitoring information
 *
 * @route GET /health
 * @returns {Object} Health status information
 */
console.log("❤️ Setting up health check endpoint...");

app.get("/health", async (req, res) => {
  console.log("🩺 Health check requested from:", req.ip);

  try {
    // Test database connection
    console.log("🔍 Testing database connectivity...");
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Database connection successful");

    const healthInfo = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      database: "connected",
      version: "1.0.0",
    };

    console.log("📋 Health check response:", healthInfo);
    res.json(healthInfo);
  } catch (error) {
    console.error("❌ Health check failed:", error);

    const errorInfo = {
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: "Database connection failed",
    };

    res.status(500).json(errorInfo);
  }
});

// ============================================================================
// API ENDPOINTS
// ============================================================================

/**
 * Get all learning topics with their associated lessons
 *
 * This endpoint:
 * 1. Fetches all topics from the database
 * 2. Orders them by orderIndex for consistent display
 * 3. Includes associated lessons for each topic
 * 4. Logs request origin for CORS debugging
 *
 * @route GET /api/topics
 * @returns {Array} Array of topic objects with nested lessons
 */
console.log("📚 Setting up topics API endpoint...");

app.get("/api/topics", async (req, res) => {
  const requestOrigin = req.get("Origin");
  console.log(
    "📖 Topics request received from origin:",
    requestOrigin || "no-origin"
  );
  console.log("🔍 Request headers:", {
    "user-agent": req.get("User-Agent"),
    accept: req.get("Accept"),
    "content-type": req.get("Content-Type"),
  });

  try {
    console.log("🗄️ Fetching topics from database...");
    const startTime = Date.now();

    const topics = await prisma.topic.findMany({
      orderBy: { orderIndex: "asc" },
      include: {
        lessons: {
          orderBy: { orderIndex: "asc" },
        },
      },
    });

    const queryTime = Date.now() - startTime;
    console.log(`✅ Topics fetched successfully in ${queryTime}ms`);
    console.log(
      `📊 Found ${topics.length} topics with ${topics.reduce((sum, topic) => sum + topic.lessons.length, 0)} total lessons`
    );

    res.json(topics);
  } catch (error) {
    console.error("❌ Error fetching topics:", error);
    res.status(500).json({
      error: "Failed to fetch topics",
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * Get questions for a specific lesson
 *
 * This endpoint:
 * 1. Extracts lesson ID from URL parameters
 * 2. Fetches questions ordered by index
 * 3. Returns questions for the specified lesson
 *
 * @route GET /api/lessons/:lessonId/questions
 * @param {string} lessonId - The ID of the lesson to get questions for
 * @returns {Array} Array of question objects
 */
console.log("❓ Setting up lesson questions API endpoint...");

app.get("/api/lessons/:lessonId/questions", async (req, res) => {
  const { lessonId } = req.params;
  console.log("❓ Questions request for lesson:", lessonId);
  console.log("🔍 Request from origin:", req.get("Origin") || "no-origin");

  try {
    console.log("🗄️ Fetching questions from database...");
    const startTime = Date.now();

    const questions = await prisma.question.findMany({
      where: { lessonId },
      orderBy: { orderIndex: "asc" },
    });

    const queryTime = Date.now() - startTime;
    console.log(`✅ Questions fetched successfully in ${queryTime}ms`);
    console.log(
      `📊 Found ${questions.length} questions for lesson ${lessonId}`
    );

    res.json(questions);
  } catch (error) {
    console.error(`❌ Error fetching questions for lesson ${lessonId}:`, error);
    res.status(500).json({
      error: "Failed to fetch questions",
      lessonId,
      timestamp: new Date().toISOString(),
    });
  }
});

// ============================================================================
// PLACEHOLDER ROUTES
// ============================================================================

/**
 * Placeholder authentication routes
 *
 * These routes are reserved for future implementation of:
 * - User registration and login
 * - JWT token management
 * - Password reset functionality
 * - Session management
 */
console.log("🔐 Setting up auth placeholder routes...");

app.use("/api/auth", (req, res) => {
  console.log(`🚧 Auth route accessed: ${req.method} ${req.originalUrl}`);
  res.json({
    message: "Auth routes coming soon",
    method: req.method,
    path: req.originalUrl,
  });
});

/**
 * Placeholder progress tracking routes
 *
 * These routes are reserved for future implementation of:
 * - User learning progress tracking
 * - Lesson completion status
 * - Achievement and badge systems
 * - Learning analytics
 */
console.log("📈 Setting up progress placeholder routes...");

app.use("/api/progress", (req, res) => {
  console.log(`🚧 Progress route accessed: ${req.method} ${req.originalUrl}`);
  res.json({
    message: "Progress routes coming soon",
    method: req.method,
    path: req.originalUrl,
  });
});

// ============================================================================
// ERROR HANDLING MIDDLEWARE
// ============================================================================

/**
 * 404 Not Found handler
 *
 * Catches all unmatched routes and returns a structured error response
 * with request details for debugging purposes.
 */
console.log("🔍 Setting up 404 handler...");

app.use("*", (req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
  console.log("🔍 Request details:", {
    ip: req.ip,
    userAgent: req.get("User-Agent"),
    origin: req.get("Origin"),
  });

  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

/**
 * Global error handling middleware
 *
 * This middleware:
 * 1. Logs all server errors for debugging
 * 2. Returns sanitized error messages in production
 * 3. Includes stack traces in development
 * 4. Sets appropriate HTTP status codes
 */
console.log("⚠️ Setting up global error handler...");

app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("💥 Global error handler triggered:", {
      message: error.message,
      stack: error.stack,
      url: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userAgent: req.get("User-Agent"),
    });

    const statusCode = error.status || error.statusCode || 500;
    const isProduction = process.env.NODE_ENV === "production";

    const errorResponse = {
      error: isProduction ? "Internal server error" : error.message,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method,
      ...(!isProduction && {
        stack: error.stack,
        details: error.details,
      }),
    };

    res.status(statusCode).json(errorResponse);
  }
);

// ============================================================================
// GRACEFUL SHUTDOWN HANDLERS
// ============================================================================

/**
 * Graceful shutdown handler for SIGTERM signal
 *
 * This handler:
 * 1. Logs the shutdown initiation
 * 2. Closes database connections properly
 * 3. Exits the process cleanly
 */
console.log("🛑 Setting up SIGTERM shutdown handler...");

process.on("SIGTERM", async () => {
  console.log("🛑 SIGTERM received, initiating graceful shutdown...");

  try {
    console.log("🗄️ Closing database connections...");
    await prisma.$disconnect();
    console.log("✅ Database connections closed successfully");

    console.log("👋 Graceful shutdown completed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during graceful shutdown:", error);
    process.exit(1);
  }
});

/**
 * Graceful shutdown handler for SIGINT signal (Ctrl+C)
 *
 * This handler:
 * 1. Logs the shutdown initiation
 * 2. Closes database connections properly
 * 3. Exits the process cleanly
 */
console.log("🛑 Setting up SIGINT shutdown handler...");

process.on("SIGINT", async () => {
  console.log("🛑 SIGINT received, initiating graceful shutdown...");

  try {
    console.log("🗄️ Closing database connections...");
    await prisma.$disconnect();
    console.log("✅ Database connections closed successfully");

    console.log("👋 Graceful shutdown completed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during graceful shutdown:", error);
    process.exit(1);
  }
});

console.log("🎯 Express application configuration completed successfully");
console.log("📤 Exporting configured Express app...");

export default app;

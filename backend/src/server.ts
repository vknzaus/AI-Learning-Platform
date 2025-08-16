/**
 * FunLabs AI Learning Platform - Backend Server
 *
 * This is the main server entry point for the FunLabs backend API.
 * It initializes the Express application, configures middleware,
 * sets up database connections, and starts the HTTP server.
 *
 * Key Features:
 * - Express.js REST API server
 * - CORS configuration for frontend communication
 * - Environment-based configuration
 * - Comprehensive logging and error handling
 * - Health check endpoints
 * - Graceful shutdown handling
 *
 * @author FunLabs Team
 * @version 1.0.0
 */

import app from "./app";

// ============================================================================
// SERVER CONFIGURATION
// ============================================================================

/**
 * Server port configuration
 * Uses environment variable or defaults to 5000 for development
 */
const PORT = Number(process.env.PORT) || 5000;

/**
 * Environment detection for configuration
 */
const NODE_ENV = process.env.NODE_ENV || "development";

// ============================================================================
// SERVER STARTUP
// ============================================================================

console.log("🚀 FunLabs Backend Server Starting...");
console.log("📋 Server Configuration:", {
  port: PORT,
  environment: NODE_ENV,
  timestamp: new Date().toISOString(),
});

/**
 * Start the HTTP server and bind to the configured port
 *
 * This function:
 * 1. Binds the Express app to the specified port
 * 2. Logs startup information for debugging
 * 3. Provides helpful URLs for development
 * 4. Handles server startup errors
 */
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log("✅ Server successfully started!");
  console.log("📊 Server Details:");
  console.log(`   🚀 Server running on port ${PORT}`);
  console.log(`   📋 Health check: http://localhost:${PORT}/health`);
  console.log(`   🌍 Environment: ${NODE_ENV}`);
  console.log(`   🔗 Topics API: http://localhost:${PORT}/api/topics`);
  console.log(`   🌐 External access: Server bound to 0.0.0.0:${PORT}`);
  console.log("");
  console.log("🎯 Ready to serve FunLabs AI Learning Platform!");
});

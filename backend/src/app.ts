import express from "express";
import cors from "cors";
import helmet from "helmet";
// @ts-ignore - morgan types issue
import morgan from "morgan";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

// Load environment variables
dotenv.config();

// Initialize Prisma client
export const prisma = new PrismaClient();

// Create Express app
const app = express();

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:5173",
      // Allow GitHub Codespaces URLs for development
      /https:\/\/.*\.github\.dev/,
    ];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Check if the origin is allowed
      const isAllowed = allowedOrigins.some((allowedOrigin) => {
        if (typeof allowedOrigin === "string") {
          return allowedOrigin === origin;
        } else {
          // Handle regex patterns
          return allowedOrigin.test(origin);
        }
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      database: "connected",
      version: "1.0.0",
    });
  } catch (error) {
    res.status(500).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: "Database connection failed",
    });
  }
});

// API endpoints
app.get("/api/topics", async (req, res) => {
  try {
    console.log("Received request for topics from origin:", req.get("Origin"));
    const topics = await prisma.topic.findMany({
      orderBy: { orderIndex: "asc" },
      include: {
        lessons: {
          orderBy: { orderIndex: "asc" },
        },
      },
    });
    res.json(topics);
  } catch (error) {
    console.error("Error fetching topics:", error);
    res.status(500).json({ error: "Failed to fetch topics" });
  }
});

app.get("/api/lessons/:lessonId/questions", async (req, res) => {
  try {
    const { lessonId } = req.params;
    const questions = await prisma.question.findMany({
      where: { lessonId },
      orderBy: { orderIndex: "asc" },
    });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

// Placeholder routes
app.use("/api/auth", (req, res) =>
  res.json({ message: "Auth routes coming soon" })
);
app.use("/api/progress", (req, res) =>
  res.json({ message: "Progress routes coming soon" })
);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
  });
});

// Error handling middleware
app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Server Error:", error);
    res.status(error.status || 500).json({
      error:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : error.message,
      ...(process.env.NODE_ENV !== "production" && { stack: error.stack }),
    });
  }
);

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down gracefully");
  await prisma.$disconnect();
  process.exit(0);
});

export default app;

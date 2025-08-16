import app from "./app";

const PORT = process.env.PORT || 8000;

// Bind to 0.0.0.0 to allow external connections (required for Codespaces)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Topics API: http://localhost:${PORT}/api/topics`);
  console.log(`🌐 External access: Server bound to 0.0.0.0:${PORT}`);
});

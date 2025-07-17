import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import blogRoutes from './routes/blogRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://localhost:5173', 'http://localhost:3000',"https://lovelyassociates.in","https://labroker.netlify.app"],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB (non-blocking)
connectDB().catch(err => {
  console.log('Database connection failed, but server will continue running');
});

// Routes
app.use('/api/blogs', blogRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    message: '🚀 Lovely Associates Blog API is running!',
    timestamp: new Date().toISOString(),
    port: PORT,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🏠 Welcome to Lovely Associates Blog API',
    endpoints: {
      health: '/api/health',
      blogs: '/api/blogs',
      createBlog: 'POST /api/blogs',
      getBlog: '/api/blogs/:slug',
      updateBlog: 'PUT /api/blogs/:slug',
      deleteBlog: 'DELETE /api/blogs/:slug',
      tags: '/api/blogs/tags/all'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    requestedPath: req.originalUrl,
    availableEndpoints: [
      'GET /',
      'GET /api/health',
      'GET /api/blogs',
      'POST /api/blogs',
      'GET /api/blogs/:slug',
      'PUT /api/blogs/:slug',
      'DELETE /api/blogs/:slug'
    ]
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 API Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/`);
  console.log(`🌐 CORS enabled for: http://localhost:5173, https://localhost:5173, http://localhost:3000`);
});
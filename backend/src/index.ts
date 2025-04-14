// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from './routes/chatRoutes';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', chatRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('DevOps AI Assistant API is running!');
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`🚀 Backend running at http://localhost:${port}`);
});

// Xử lý lỗi unhandled
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});
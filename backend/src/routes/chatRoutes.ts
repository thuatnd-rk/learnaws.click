import express from 'express';
import { handleChatMessage } from '../controllers/chatController';

// Tạo router không dùng type annotation
const router = express.Router();

// Sử dụng arrow function wrapper
router.post('/chat', (req, res) => {
  console.log(req)
  handleChatMessage(req, res);
});

export default router;
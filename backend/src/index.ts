import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  res.json({ reply: `Bạn hỏi: "${message}" — đây là phản hồi mẫu từ DevOps Assistant.` });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`🚀 Backend running at http://localhost:${port}`));

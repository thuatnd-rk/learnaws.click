import { Request, Response } from 'express';
import { generateAIResponse, generateAIResponseWithContext, generateStreamingResponse } from '../services/bedrockService';
import { getTopicPrompt, TOPIC_PROMPTS } from '../services/promptTemplates';

export async function handleChatMessage(req: Request, res: Response) {
  try {
    const { message, conversation, topic, subtopic } = req.body;
    
    console.log({ message, conversation, topic, subtopic });
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    let aiResponse: string;
    
    // Sử dụng prompt theo chủ đề nếu được chỉ định
    if (topic && subtopic) {
      const topicPrompt = getTopicPrompt(topic, subtopic);
      aiResponse = await generateAIResponse(topicPrompt);
    }
    // Nếu có lịch sử hội thoại, sử dụng context
    else if (conversation && Array.isArray(conversation) && conversation.length > 0) {
      // Thêm tin nhắn hiện tại vào cuối conversation
      const updatedConversation = [...conversation, { type: 'user', text: message }];
      aiResponse = await generateAIResponseWithContext(updatedConversation);
    } else {
      // Nếu không có lịch sử, chỉ gửi tin nhắn hiện tại
      aiResponse = await generateAIResponse(message);
    }
    
    return res.status(200).json({
      reply: aiResponse
    });
    
  } catch (error) {
    console.error('Error in chat controller:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}

// Giữ nguyên phần còn lại của controller
export async function handleStreamingChatMessage(req: Request, res: Response) {
  // ... phần còn lại của hàm
}
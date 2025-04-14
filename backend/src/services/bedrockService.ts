import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import dotenv from 'dotenv';

dotenv.config();

// Khởi tạo client sử dụng AWS credentials đã cấu hình qua aws configure
const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || 'us-east-1'
  // Không cần thêm credentials vì sẽ tự động lấy từ aws configure
});

/**
 * Gọi Claude AI với prompt và trả về kết quả
 * @param prompt Câu hỏi hoặc yêu cầu của người dùng
 * @returns Phản hồi từ Claude AI
 */
export async function generateAIResponse(prompt: string): Promise<string> {
  try {
    console.log(`Sending prompt to Claude: "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}"`);
    
    // Tạo đúng format cho Claude 3 Sonnet theo Messages API
    const payload = {
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 1500,
      temperature: 0.7,
      system: "Bạn là một kỹ sư DevOps cấp cao với chuyên môn về AWS, Kubernetes, CI/CD, và infrastructure. " +
              "Hãy trả lời một cách chuyên nghiệp, đầy đủ và dễ hiểu. " +
              "Phản hồi của bạn nên ngắn gọn nhưng đầy đủ thông tin, ưu tiên các giải pháp thực tế.",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            }
          ]
        }
      ]
    };

    // Sử dụng InvokeModelCommand
    const command = new InvokeModelCommand({
      modelId: process.env.BEDROCK_MODEL_ID,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify(payload)
    });

    // Gửi request đến Bedrock
    const response = await bedrockClient.send(command);
    
    // Parse kết quả
    if (response.body) {
      const responseBody = JSON.parse(new TextDecoder().decode(response.body));
      return responseBody.content[0].text;
    }
    
    return "Không nhận được phản hồi từ AI";
  } catch (error) {
    console.error("Error calling Claude:", error);
    throw error;
  }
}

/**
 * Hàm mở rộng - gọi Claude AI với toàn bộ lịch sử hội thoại
 * @param messages Mảng các tin nhắn trong cuộc hội thoại
 * @returns Phản hồi từ Claude AI
 */
export async function generateAIResponseWithContext(messages: Array<{type: string, text: string}>): Promise<string> {
  try {
    // Chuyển đổi định dạng tin nhắn để phù hợp với API
    // QUAN TRỌNG: Claude chỉ chấp nhận 'user' hoặc 'assistant' làm role, không chấp nhận 'system'
    const formattedMessages = messages.map(msg => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: [{ type: 'text', text: msg.text }]
    }));
    
    // Tạo payload với lịch sử hội thoại và system instruction 
    // đặt vào thuộc tính system riêng thay vì qua messages
    const payload = {
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 1500,
      temperature: 0.7,
      system: "Bạn là một kỹ sư DevOps cấp cao với chuyên môn về AWS, Kubernetes, CI/CD, và infrastructure. " +
              "Hãy trả lời một cách chuyên nghiệp, đầy đủ và dễ hiểu.",
      messages: formattedMessages
    };

    // Gọi API
    const command = new InvokeModelCommand({
      modelId: process.env.BEDROCK_MODEL_ID,
      contentType: "application/json",
      accept: "application/json", 
      body: JSON.stringify(payload)
    });

    const response = await bedrockClient.send(command);
    
    if (response.body) {
      const responseBody = JSON.parse(new TextDecoder().decode(response.body));
      return responseBody.content[0].text;
    }
    
    return "Không nhận được phản hồi từ AI";
  } catch (error) {
    console.error("Error calling Claude with context:", error);
    throw error;
  }
}
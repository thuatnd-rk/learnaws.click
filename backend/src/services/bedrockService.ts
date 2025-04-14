import { BedrockRuntimeClient, InvokeModelCommand, InvokeModelWithResponseStreamCommand } from "@aws-sdk/client-bedrock-runtime";
import dotenv from 'dotenv';
import { createClaudePayload, createClaudePayloadWithContext } from './promptTemplates';

dotenv.config();

// Khởi tạo client sử dụng AWS credentials đã cấu hình qua aws configure
const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || 'us-east-1'
  // Không cần thêm credentials vì sẽ tự động lấy từ aws configure
});

/**
 * Gọi Claude AI với streaming response
 * @param prompt Câu hỏi hoặc yêu cầu của người dùng
 * @returns Stream phản hồi từ Claude AI
 */
export async function generateStreamingResponse(prompt: string) {
  try {
    console.log(`Sending streaming prompt to Claude: "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}"`);
    
    // Sử dụng template để tạo payload
    const payload = createClaudePayload(prompt);

    // Sử dụng InvokeModelWithResponseStreamCommand để streaming
    const command = new InvokeModelWithResponseStreamCommand({
      modelId: process.env.BEDROCK_MODEL_ID,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify(payload)
    });

    // Gửi request đến Bedrock
    const response = await bedrockClient.send(command);
    return response.body;
    
  } catch (error) {
    console.error("Error calling Claude with streaming:", error);
    throw error;
  }
}

// Cập nhật hàm generateAIResponse để sử dụng template
export async function generateAIResponse(prompt: string): Promise<string> {
  try {
    console.log(`Sending prompt to Claude: "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}"`);
    
    // Sử dụng template để tạo payload
    const payload = createClaudePayload(prompt);
    
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
    console.error("Error calling Claude:", error);
    throw error;
  }
}

// Cập nhật hàm generateAIResponseWithContext để sử dụng template
export async function generateAIResponseWithContext(messages: Array<{type: string, text: string}>): Promise<string> {
  try {
    console.log(`Sending conversation with ${messages.length} messages to Claude`);
    
    // Sử dụng template để tạo payload với context
    const payload = createClaudePayloadWithContext(messages);
    
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
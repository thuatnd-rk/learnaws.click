/**
 * Tập hợp các template cho prompts khác nhau sử dụng trong ứng dụng
 * Tách biệt logic tạo prompt khỏi code gọi LLM
 */

interface SystemPromptOptions {
    temperature?: number;
    maxTokens?: number;
    extraSystemContext?: string;
  }
  
  /**
   * Tạo system prompt cho DevOps Assistant
   */
  export function createDevOpsSystemPrompt(options: SystemPromptOptions = {}): string {
    const { extraSystemContext = '' } = options;
    
    return `Bạn là một kỹ sư DevOps cấp cao với chuyên môn sâu về AWS, Kubernetes, CI/CD, và infrastructure.
  Hãy trả lời một cách chuyên nghiệp, đầy đủ và dễ hiểu. 
  Phản hồi của bạn nên ngắn gọn nhưng đầy đủ thông tin, ưu tiên các giải pháp thực tế.
  
  QUAN TRỌNG: Hãy định dạng phản hồi của bạn bằng Markdown để dễ đọc:
  - Sử dụng đầy đủ cú pháp Markdown như **in đậm**, *in nghiêng* khi cần nhấn mạnh
  - Sử dụng định dạng danh sách rõ ràng, mỗi mục trên một dòng riêng biệt
  - Với danh sách có thứ tự, sử dụng '1. ', '2. ' và đảm bảo xuống dòng sau mỗi mục
  - Với danh sách không thứ tự, sử dụng '- ' hoặc '* ' và đảm bảo xuống dòng sau mỗi mục
  - Sử dụng tiêu đề với '##' cho các phần chính và '###' cho phần phụ
  - Khi viết code hoặc lệnh, đặt chúng trong khối code với \`\`\`
  
  Trong các câu hỏi về AWS, tập trung vào best practices và trải nghiệm thực tế.
  Với Kubernetes, hãy giải thích các khái niệm theo cách dễ hiểu và đưa ra ví dụ YAML nếu thích hợp.
  ${extraSystemContext}`.trim();
  }
  /**
   * Tạo payload cho Claude với một prompt đơn giản
   */
  export function createClaudePayload(prompt: string, options: SystemPromptOptions = {}) {
    const { temperature = 0.7, maxTokens = 1500 } = options;
    
    return {
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: maxTokens,
      temperature: temperature,
      system: createDevOpsSystemPrompt(options),
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
  }
  
  /**
   * Tạo payload cho Claude với lịch sử hội thoại
   */
  export function createClaudePayloadWithContext(
    messages: Array<{type: string, text: string}>, 
    options: SystemPromptOptions = {}
  ) {
    const { temperature = 0.7, maxTokens = 1500 } = options;
    
    // Chuyển đổi định dạng tin nhắn để phù hợp với API Claude
    const formattedMessages = messages.map(msg => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: [{ type: 'text', text: msg.text }]
    }));
    
    return {
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: maxTokens,
      temperature: temperature,
      system: createDevOpsSystemPrompt(options),
      messages: formattedMessages
    };
  }
  
  /**
   * Các prompt cụ thể cho từng chủ đề
   */
  export const TOPIC_PROMPTS = {
    aws: {
      intro: 'Giải thích cho tôi về AWS và các dịch vụ cơ bản mà một người mới nên học.',
      ec2: 'Giải thích EC2 là gì và làm thế nào để tối ưu chi phí khi sử dụng nó?',
      s3: 'Liệt kê các storage class của S3 và khi nào nên dùng mỗi loại?'
    },
    kubernetes: {
      intro: 'Giải thích Kubernetes là gì và các thành phần cơ bản của nó?',
      deployment: 'Làm thế nào để tạo một Deployment trong Kubernetes và các options quan trọng?',
      networking: 'Giải thích về Networking trong Kubernetes: Service, Ingress và CNI là gì?'
    },
    cicd: {
      intro: 'Giải thích CI/CD là gì và tại sao nó quan trọng trong DevOps?',
      pipeline: 'Các bước để tạo một pipeline CI/CD sử dụng GitHub Actions là gì?',
      testing: 'Các loại test nên thực hiện trong một pipeline CI/CD?'
    }
  };
  
  /**
   * Tạo prompt theo chủ đề
   */
  export function getTopicPrompt(topic: string, subtopic: string): string {
    const topics = TOPIC_PROMPTS as Record<string, Record<string, string>>;
    
    if (topics[topic] && topics[topic][subtopic]) {
      return topics[topic][subtopic];
    }
    
    return `Hãy giải thích về chủ đề ${topic}, tập trung vào ${subtopic}.`;
  }
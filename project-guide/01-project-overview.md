# Project Overview: DevOps AI WebApp

## 🎯 Mục tiêu
Xây dựng một website cá nhân vừa để học tập, thực hành và chia sẻ kiến thức về DevOps, Cloud, Solution Architecture. Đây đồng thời là một dự án thực tế giúp nâng cao kỹ năng triển khai hạ tầng, CI/CD, bảo mật, và ứng dụng AI.

## 🔧 Các chức năng chính
1. **Chatbot AI**: Trả lời như một Senior DevOps Engineer, sử dụng AWS Bedrock làm backend AI.
2. **Blog cá nhân**: Viết bài Markdown chia sẻ kinh nghiệm về DevOps, CI/CD, Cloud.
3. **Hệ thống người dùng**: Đăng ký, đăng nhập, quản lý phiên trò chuyện và giới hạn gọi AI.
4. **Chức năng mở rộng** (phase sau):
   - Dashboard theo dõi tiến độ học.
   - GitOps mini tool.
   - Phân quyền (admin/user).
   - CI/CD demo với staging/production.

## ⚙️ Tech Stack

### Frontend
- **Framework**: Next.js
- **UI**: Tailwind CSS
- **Markdown**: MDX hoặc thư viện parse markdown (gray-matter, remark)

### Backend / API
- **Runtime**: Node.js
- **Framework**: Express.js
- **AI Integration**: AWS Bedrock (Claude, Titan...) qua SDK `@aws-sdk/client-bedrockruntime`
- **Auth**: JWT hoặc session-based (tùy môi trường)
- **ORM**: Prisma (PostgreSQL)

### Database
- **Primary**: PostgreSQL (Docker Compose trong dev, RDS hoặc Aurora sau)
- **Schema**: users, posts, messages, sessions

### DevOps / Infra
- **Containerization**: Docker
- **Orchestration**: Docker Compose (dev), Kubernetes (prod)
- **Reverse Proxy**: Nginx
- **CI/CD**: GitHub Actions
- **Infrastructure as Code**: Terraform
- **Cloud Provider**: AWS
  - **Giai đoạn đầu**: EC2 + Route 53 + S3 (blog assets, Terraform state)
  - **Mở rộng**: EKS (Kubernetes), IAM, CloudWatch

### Monitoring / Logging
- **Logging**: Fluent Bit + CloudWatch (EKS phase)
- **Monitoring**: Prometheus + Grafana (phase 3)

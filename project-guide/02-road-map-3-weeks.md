# Roadmap: 3-Week Plan

## Phase 1: Khởi tạo hệ thống (Tuần 1)
- Thiết kế giao diện frontend (Next.js/Vue - Tailwind).
- Backend API - Tích hợp chatbot AI.
- Docker hóa và CI/CD pipeline GitHub Actions.
- Deploy EC2 với Nginx reverse proxy.
- Viết YAML chuẩn cho FE/BE, test local K8s.
- Triển khai cụm K8S trên EC2 (1 node - 1 worker), làm quen kubectl, pod, deployment, service.

## Phase 2: Bổ sung tính năng (Tuần 2)
- Cấu hình domain learnaws.click.
- Cấu hình nginx trên EC2 hoặc container.
- Bảo mật (HTTPS, header, IAM).
- Tạo màn hình đăng nhập đơn giản (mock hoặc email-only).
- Cài PostgreSQL (docker-compose).
- Tạo schema: users, posts, messages.
- Kết nối backend với DB (Prisma hoặc ORM khác).
- API: đăng ký, đăng nhập, lưu lịch sử chat.
- Gắn session user để giới hạn gọi Bedrock.
- Cải thiện CI/CD với môi trường staging.
- Tạo blog viết bài Markdown.

## Phase 3: Mở rộng hệ thống (Tuần 3)
- Terraform triển khai VPC, EC2, S3.
- Deploy app lên EKS với Helm chart hoặc kubectl apply.
- Tích hợp Auto-scaling (HPA), logging (Fluent Bit, CloudWatch), monitoring (Prometheus).
- Triển khai GitOps bằng ArgoCD (hoặc GitHub Actions giả lập GitOps).
- Tổng hợp & chuẩn hóa lại production configuration (HTTPS, domain, secret, alert).
- Tối ưu index, pagination, full-text search.
- Sao lưu định kỳ hoặc chuyển sang RDS/Aurora (nếu EKS).
- Tích hợp hệ thống phân quyền đơn giản (nếu cần admin).
# ✅ Phase 1: Kế hoạch chi tiết tháng đầu tiên

## Tuần 1: Khởi tạo dự án (Monorepo + UI chatbot)
> 🎯 Mục tiêu: Có cấu trúc repo chuẩn, giao diện chatbot đơn giản và API route đầu tiên

### Thứ 2
- [ ] Tạo GitHub repo `devops-ai-webapp`
- [ ] Cấu trúc thư mục: `frontend`, `backend`, `infra`, `.github/workflows/`, `docs/`
- [ ] Tạo `.gitignore`, `README.md`, commit & push

### Thứ 3
- [ ] Init frontend: Next.js hoặc Vue
- [ ] Xóa mã mẫu, tạo cấu trúc layout chính

### Thứ 4
- [ ] Tạo component giao diện chatbot (input + output)
- [ ] Lưu state hội thoại bằng state hook / Vue reactive

### Thứ 5
- [ ] Init backend bằng Node.js + Express
- [ ] Cài `express`, `cors`, `dotenv`
- [ ] Tạo route `/api/chat`, trả về JSON mẫu

### Thứ 6-7
- [ ] Gọi `/api/chat` từ frontend
- [ ] Hiển thị response lên giao diện

---

## Tuần 2: Tích hợp AWS Bedrock + Prompt Template
> 🎯 Mục tiêu: Gọi được model AI từ backend và hiển thị lên frontend

### Thứ 2
- [ ] Cài SDK Bedrock: `@aws-sdk/client-bedrockruntime`
- [ ] Tạo `.env`, config AWS region, model ID, v.v.
- [ ] Viết `bedrockClient.js`

### Thứ 3
- [ ] Backend nhận prompt từ frontend
- [ ] Gửi prompt lên Bedrock và nhận response
- [ ] Trả lại response cho frontend

### Thứ 4
- [ ] Viết file `promptTemplate.js`
- [ ] Prompt mô phỏng DevOps Senior (CI/CD, K8s, GitOps, v.v.)

### Thứ 5-6
- [ ] Kiểm thử full luồng: Chat UI → Backend → Bedrock → UI
- [ ] Thêm xử lý lỗi, validate input

---

## Tuần 3: Docker hóa & CI/CD
> 🎯 Mục tiêu: Dockerize hệ thống, build/test bằng docker-compose, setup CI/CD

### Thứ 2
- [ ] Viết `Dockerfile.frontend`
- [ ] Build FE: `npm run build` và run static server

### Thứ 3
- [ ] Viết `Dockerfile.backend`
- [ ] Chạy backend bằng Docker (port 4000)

### Thứ 4
- [ ] Tạo `docker-compose.yml` cho FE + BE
- [ ] Mount `.env`, expose port, test full stack local

### Thứ 5
- [ ] Tạo `.github/workflows/deploy.yml`
- [ ] CI: checkout → build → push image (DockerHub/ECR)

### Thứ 6-7
- [ ] Setup deploy EC2 qua SSH
- [ ] Tạo GitHub Secret: `EC2_HOST`, `EC2_USER`, `PRIVATE_KEY`
- [ ] Thêm bước: copy file & `docker-compose up` trên EC2

---

## Tuần 4: Deploy lên EC2 + Domain + HTTPS
> 🎯 Mục tiêu: App chạy thật trên EC2 qua domain HTTPS

### Thứ 2
- [ ] Tạo EC2 instance (Ubuntu)
- [ ] Mở port 22, 80, 443, 3000, 4000
- [ ] Ghi IP EC2, cấu hình domain (Route53 / DNS)

### Thứ 3
- [ ] SSH vào EC2, cài Docker + Docker Compose

### Thứ 4
- [ ] Viết `nginx.conf` reverse proxy `/` và `/api`
- [ ] Cài Nginx (trong container hoặc native)

### Thứ 5
- [ ] Cài Certbot, setup HTTPS miễn phí
- [ ] Redirect HTTP → HTTPS

### Thứ 6-7
- [ ] Deploy app qua `docker-compose up -d`
- [ ] Truy cập qua domain, test chatbot thật sự

---

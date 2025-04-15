# ✅ Kế hoạch phát triển 1 tuần: DevOps AI WebApp MVP

> 🎯 **Mục tiêu:** Hoàn thành MVP có giao diện chatbot đơn giản, gọi được AWS Bedrock, chạy bằng Docker và deploy lên EC2 với domain HTTPS.

---

### 🔹 **Thứ 2 – Khởi tạo dự án & giao diện cơ bản**
- Tạo GitHub repo `devops-ai-webapp`
- Tạo cấu trúc thư mục: `frontend`, `backend`, `infra`, `.github/`, `docs/`
- Init `frontend` bằng Next.js hoặc Vue, xoá code mẫu
- Thiết kế layout và component giao diện chatbot (input + output)
- Lưu state hội thoại bằng hook / reactive

---

### 🔹 **Thứ 3 – Khởi tạo backend & kết nối API**
- Init backend Node.js + Express
- Cài `express`, `cors`, `dotenv`, tạo route `/api/chat`
- Gọi API `/api/chat` từ frontend, hiển thị response lên giao diện
- Tạo file `promptTemplate.js`, mock prompt DevOps Senior

---

### 🔹 **Thứ 4 – Tích hợp AWS Bedrock**
- Cài SDK: `@aws-sdk/client-bedrockruntime`
- Cấu hình `.env`, AWS credentials (mount `.aws`)
- Gửi prompt lên Bedrock → nhận response → trả về frontend
- Thêm xử lý lỗi và validate input cơ bản

---

### 🔹 **Thứ 5 – Docker hóa toàn bộ hệ thống**
- Viết `Dockerfile` cho frontend (Next.js build static)
- Viết `Dockerfile` cho backend
- Tạo `docker-compose.yml`, mount `.env`, expose port
- Kiểm thử full stack FE + BE + Bedrock qua Docker local

---

### 🔹 **Thứ 6 – CI/CD + Deploy EC2**
- Tạo `.github/workflows/deploy.yml` (build → push image)
- SSH vào EC2, cài Docker + Docker Compose
- Deploy app bằng `docker-compose up -d`
- Cài Nginx reverse proxy + Certbot miễn phí (HTTPS)
- Cấu hình domain (Route53 / DNS)

---

### 🔹 **Thứ 7 – Test cuối + hoàn thiện**
- Truy cập app qua domain (HTTPS)
- Test chatbot từ UI → backend → Bedrock
- Viết `README.md` hướng dẫn setup + deploy
- Đánh giá lại toàn bộ tiến độ và lập kế hoạch tiếp theo

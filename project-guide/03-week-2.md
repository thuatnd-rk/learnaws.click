# ✅ Kế hoạch phát triển tuần 2: Bổ sung tính năng DevOps AI WebApp

> 🎯 **Mục tiêu:** Thêm hệ thống đăng nhập, lưu dữ liệu vào database, viết blog Markdown, cải thiện CI/CD, cấu hình bảo mật và domain production.

---

### 🔹 **Thứ 2 – Hệ thống người dùng cơ bản**
- Cài PostgreSQL bằng Docker Compose
- Cấu hình `.env` cho database
- Tạo bảng `users`, `messages`, `posts` (dùng Prisma schema hoặc SQL thuần)
- Kết nối backend với PostgreSQL (ORM: Prisma)

---

### 🔹 **Thứ 3 – Đăng nhập & lưu lịch sử chat**
- Tạo API `/auth/login` (mock login bằng email, không cần mật khẩu)
- Tạo middleware xác thực người dùng (JWT hoặc session đơn giản)
- Lưu message khi user chat vào bảng `messages`
- Gắn session user với tin nhắn để phân biệt

---

### 🔹 **Thứ 4 – Blog cá nhân**
- Tạo folder `posts/` chứa các file Markdown
- Viết component đọc danh sách bài viết bằng `gray-matter` + `remark`
- Tạo routing động cho từng bài viết Markdown (Next.js dynamic route)
- Tạo thử 1 bài: "Giới thiệu dự án DevOps AI WebApp"

---

### 🔹 **Thứ 5 – Bảo mật & domain**
- Cấu hình bảo mật HTTPS cho Nginx (nếu chưa làm từ tuần 1)
- Thêm security headers vào Nginx (`Content-Security-Policy`, `X-Frame-Options`, ...)
- Cấu hình domain `learnaws.click` trỏ về EC2 (Route53 hoặc DNS provider)
- Tạo IAM policy tối thiểu cho Bedrock hoặc S3 (nếu cần lưu ảnh/blog sau này)

---

### 🔹 **Thứ 6 – CI/CD & môi trường staging**
- Cập nhật `deploy.yml` tách rõ `staging` và `production`
- Thêm GitHub Actions cho branch `develop` → deploy staging
- Dùng subdomain `staging.learnaws.click` hoặc cổng riêng
- Đảm bảo staging dùng cấu hình `.env.staging`

---

### 🔹 **Thứ 7 – Kiểm thử & hoàn thiện**
- Kiểm tra full flow: đăng nhập → chat → lưu DB → hiển thị lịch sử
- Truy cập blog, kiểm thử hiển thị bài viết Markdown
- Review lại Nginx, headers, bảo mật
- Viết 1 bài blog: "Cách lưu lịch sử chat AI vào database bằng PostgreSQL"
- Lập kế hoạch tuần 3 (triển khai Terraform + EKS + monitoring)
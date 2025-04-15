# ✅ Kế hoạch phát triển tuần 3: Mở rộng hệ thống DevOps AI WebApp

> 🎯 **Mục tiêu:** Chuẩn hóa hạ tầng bằng Terraform, deploy ứng dụng lên EKS, triển khai GitOps, logging, monitoring, backup và tối ưu hiệu năng.

---

### 🔹 **Thứ 2 – Terraform & hạ tầng AWS**
- Viết module Terraform cho VPC: `vpc.tf`, `subnet.tf`, `internet_gateway.tf`, `route_table.tf`
- Tạo EC2 bằng Terraform (dùng cho staging/proxy hoặc node demo)
- Viết Terraform cho S3: bucket lưu blog assets, Terraform state (optional)
- Cấu hình remote backend (S3 + DynamoDB lock)

---

### 🔹 **Thứ 3 – Triển khai EKS & Helm chart**
- Dùng Terraform tạo cụm EKS: `eks.tf`, `node_groups.tf`, `iam_roles.tf`
- Cài `kubectl`, `aws-auth`, và connect với cụm EKS
- Viết Helm chart hoặc YAML cho frontend & backend
- Deploy app FE/BE lên EKS (`helm install` hoặc `kubectl apply`)

---

### 🔹 **Thứ 4 – Auto-scaling & logging**
- Tạo HPA cho backend (CPU-based)
- Triển khai Fluent Bit để log về CloudWatch
- Cài Prometheus + Grafana để monitor pod/container (dùng Helm chart Prometheus Community)
- Tạo dashboard hiển thị CPU, memory, số request

---

### 🔹 **Thứ 5 – GitOps & chuẩn hóa production**
- Cài ArgoCD (hoặc viết flow CI/CD giả lập GitOps bằng GitHub Actions)
- Tạo repo `infra-config` hoặc `k8s-manifest`
- Cấu hình auto-sync từ Git lên EKS (ArgoCD hoặc workflow)
- Review và chuẩn hóa:
  - Secrets (dùng Secret Manager hoặc sealed-secrets)
  - Domain routing (Ingress Controller, cert-manager)
  - Cấu hình HTTPS, redirect, các thông số môi trường staging/prod

---

### 🔹 **Thứ 6 – Tối ưu database & sao lưu**
- Tối ưu Prisma schema: index, quan hệ, pagination query
- Thêm full-text search (nếu có blog/message tìm kiếm)
- Thiết lập sao lưu định kỳ PostgreSQL (dùng cron job hoặc snapshot RDS nếu dùng)
- Cấu hình auto scale PostgreSQL (nếu chuyển Aurora/RDS)

---

### 🔹 **Thứ 7 – Phân quyền & đánh giá hệ thống**
- Tạo role `admin`, `user` trong bảng `users`
- Thêm middleware kiểm tra phân quyền trên một vài route
- Tạo trang admin đơn giản (thống kê chat, bài viết)
- Review toàn bộ hệ thống: bảo mật, scale, CI/CD, GitOps, observability
- Viết blog: "Triển khai DevOps AI WebApp lên EKS với GitOps & Auto-scaling"
- Lập kế hoạch duy trì / mở rộng hệ thống sau tuần 3 (maintenance phase)
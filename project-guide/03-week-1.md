# ✅ Kế hoạch cập nhật cho **Tuần 1 – sử dụng K8s + ArgoCD**

> 🎯 Mục tiêu: Build và triển khai DevOps AI WebApp trên cụm K8s (2 node EC2) bằng ArgoCD, không dùng Docker Compose.

---

### 🔹 **Thứ 2 – Setup repo & giao diện chatbot**
- Tạo GitHub repo: `devops-ai-webapp`
- Tạo thư mục chuẩn: `frontend/`, `backend/`, `k8s/`, `infra/`, `.github/`
- Init project frontend (Next.js hoặc Vue) + Tailwind CSS
- Thiết kế UI chatbot cơ bản: input + message list
- Tạo giao diện nhận API trả lời từ backend mock

---

### 🔹 **Thứ 3 – Backend + kết nối Bedrock**
- Init backend Node.js + Express
- Tạo route `/api/chat` mock
- Tích hợp gọi AWS Bedrock (Claude) với SDK `@aws-sdk/client-bedrock-runtime`
- Xử lý lỗi, validate input

---

### 🔹 **Thứ 4 – Viết Dockerfile + build image**
- Viết Dockerfile chuẩn cho `frontend` và `backend` (multi-stage nếu cần)
- Build image local, test bằng Docker
- Push image lên ECR (cấu hình login ECR)

---

### 🔹 **Thứ 5 – Triển khai cụm K8s (EC2 self-managed)**
- Dùng 2 EC2 Ubuntu (1 control-plane, 1 worker)
- Cài kubeadm, kubelet, kubectl
- Init cluster (có thể dùng Calico/Flannel làm CNI)
- Join node worker vào cluster
- Cài kube-dashboard hoặc Lens để quan sát

---

### 🔹 **Thứ 6 – Viết YAML K8s + cài ArgoCD**
- Tạo YAML cho:
  - `Deployment` FE + BE
  - `Service`
  - `Ingress` (có TLS nếu cần)
  - `ConfigMap` & `Secret`
- Tạo folder `k8s/overlays/staging`, `k8s/base`
- Cài ArgoCD lên cluster, expose qua ingress
- Tạo Application sync từ repo

---

### 🔹 **Thứ 7 – Hoàn thiện & test**
- Truy cập domain → test frontend + backend
- Kiểm tra kết nối Bedrock
- Check ArgoCD auto-sync (hoặc manual sync)
- Viết `README.md` hướng dẫn deploy qua ArgoCD
- Review & tối ưu lại manifest
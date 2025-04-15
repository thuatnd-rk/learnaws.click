# CI/CD & Hạ tầng

## GitHub Actions Pipeline
- `on: push`
- Branch strategy:
  - `main` → deploy production (EKS)
  - `develop` → deploy staging (EC2 hoặc staging namespace trên EKS)
- Jobs:
  - Lint & test (optional)
  - Build Docker images (frontend & backend)
  - Push image lên ECR
  - Deploy:
    - Nếu dùng GitOps (ArgoCD): update Git repo manifest
    - Nếu không dùng ArgoCD: SSH vào EC2 hoặc `kubectl apply` trực tiếp

## EC2 Deployment (Staging / Bootstrap)
- EC2 Ubuntu, cài đặt:
  - Docker + Docker Compose
  - Nginx (host native hoặc container)
- Cấu hình `nginx.conf`:
  - Proxy `/api` → backend container
  - Proxy `/` → frontend static or app
- Cài đặt Certbot để cấp chứng chỉ SSL
  - Tự động gia hạn bằng cron hoặc systemd timer
- Ánh xạ domain staging (`staging.learnaws.click`)

## EKS Deployment (Production)
- Cụm EKS được triển khai bằng Terraform
- Helm chart hoặc YAML manifest cho frontend & backend
- Sử dụng:
  - `Ingress + cert-manager` để cấp SSL
  - `HPA` cho auto-scaling
  - `ArgoCD` để triển khai GitOps (sync từ repo k8s-manifest)
- Logging:
  - Fluent Bit → CloudWatch Logs
- Monitoring:
  - Prometheus + Grafana qua Helm

## Terraform Hạ tầng
- Quản lý toàn bộ hạ tầng:
  - VPC, Subnet, IGW, Route Table
  - EC2, Security Group, Key Pair
  - S3 cho lưu trữ và backend Terraform
  - EKS: control plane, node group, IAM roles
- Chia module:
  - `network`, `compute`, `storage`, `eks`
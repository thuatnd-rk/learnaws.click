# K8s và GitOps với ArgoCD

## 1. Tổ chức thư mục GitOps

Cấu trúc thư mục GitOps theo mô hình Kustomize:

```
k8s/
├── base/                     # Cấu hình cơ sở
│   ├── namespace.yaml        # Định nghĩa namespace
│   ├── frontend/             # Các manifest cho frontend
│   │   ├── deployment.yaml   # Pod template, replicas, container configs
│   │   ├── service.yaml      # Service để expose frontend
│   │   └── kustomization.yaml
│   ├── backend/              # Các manifest cho backend
│   │   ├── deployment.yaml   # Pod template, environment vars
│   │   ├── service.yaml      # Service để expose API
│   │   ├── configmap.yaml    # Cấu hình backend
│   │   └── kustomization.yaml
│   └── kustomization.yaml    # Resources chung của base
├── overlays/                 # Cấu hình theo môi trường
│   ├── dev/                  # Môi trường phát triển
│   │   ├── kustomization.yaml
│   │   ├── frontend-patch.yaml
│   │   └── backend-patch.yaml
│   └── prod/                 # Môi trường sản xuất
│       ├── kustomization.yaml
│       ├── ingress.yaml      # Ingress rules cho production
│       ├── frontend-patch.yaml
│       └── backend-patch.yaml
└── argocd/                   # Cấu hình ArgoCD
    ├── install/
    │   └── argocd-install.yaml
    └── applications/
        ├── prod-app.yaml
        └── dev-app.yaml
```

## 2. Các loại manifest K8s chính

- **Namespace**: Định nghĩa namespace `learnaws`
- **Deployments**: Cấu hình pods, replicas, containers
- **Services**: Expose deployments trong cluster
- **ConfigMaps**: Cấu hình môi trường cho ứng dụng
- **Ingress**: Định tuyến traffic từ bên ngoài vào services
- **Secrets**: Lưu trữ AWS credentials
- **HPA (Horizontal Pod Autoscaler)**: Tự động scale pods theo tải

## 3. Kustomize

- **Base**: Chứa các cấu hình chung cho tất cả môi trường
- **Overlays**: Chứa các patch để điều chỉnh cấu hình cho từng môi trường
  - **Dev**: ít replicas, resource limits thấp hơn
  - **Prod**: nhiều replicas, ingress với domain chính, resource cao hơn

## 4. Triển khai ArgoCD

### Các bước triển khai

1. **Cài đặt các thành phần cơ bản**:
   - Tạo namespace `argocd`
   - Cài đặt ArgoCD từ manifest chính thức
   - Đợi ArgoCD server sẵn sàng

2. **Cài đặt các thành phần hỗ trợ**:
   - Ingress Controller (NGINX)
   - cert-manager: tự động quản lý chứng chỉ SSL
   - ClusterIssuer cho Let's Encrypt

3. **Cấu hình truy cập ArgoCD**:
   - Tạo Ingress cho ArgoCD UI
   - Cấu hình DNS cho `argocd.learnaws.click`
   - Lấy mật khẩu admin ban đầu

4. **Tạo ArgoCD Applications**:
   - Định nghĩa application cho môi trường prod
   - Định nghĩa application cho môi trường dev (nếu cần)
   - Áp dụng các application vào cluster

## 5. CI/CD với GitHub Actions và ArgoCD

### Luồng CI/CD

1. **CI với GitHub Actions**:
   - Kích hoạt khi có push vào main
   - Build Docker images
   - Push lên Amazon ECR với tag phù hợp

2. **CD với ArgoCD**:
   - ArgoCD giám sát repository Git
   - Tự động phát hiện thay đổi trong manifests
   - Đồng bộ hóa trạng thái cluster với Git

### Lợi ích của mô hình GitOps

- **Tách biệt CI và CD**: CI chỉ build và push images, CD (ArgoCD) triển khai manifests
- **Cấu hình là code**: Toàn bộ cấu hình hệ thống được theo dõi trong Git
- **Tự động hóa**: ArgoCD tự động đồng bộ hóa giữa Git và cluster
- **Rollbacks**: Dễ dàng rollback bằng cách quay lại commit trước

## 6. Các lưu ý quan trọng

1. **Thay thế biến**: Thay `${AWS_ACCOUNT_ID}`, `${AWS_REGION}` bằng giá trị thực

2. **AWS Credentials**: Sử dụng Secret hoặc IAM Role for Service Accounts

3. **Image Tagging**: Sử dụng tag cụ thể thay vì `latest`

4. **Backup**: Backup cấu hình ArgoCD

5. **DNS Setup**: Cấu hình Route53 hoặc DNS provider để trỏ vào cụm K8s

## 7. Kiểm tra triển khai

- Truy cập ArgoCD UI: `https://argocd.learnaws.click`
- Theo dõi quá trình đồng bộ hóa
- Truy cập ứng dụng: `https://learnaws.click`



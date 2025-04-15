## Terraform Hạ tầng
- Quản lý toàn bộ hạ tầng:
  - VPC, Subnet, IGW, Route Table
  - EC2, Security Group, Key Pair
  - S3 cho lưu trữ và backend Terraform
  - EKS: control plane, node group, IAM roles
- Chia module:
  - `network`, `compute`, `storage`, `eks`
# Kubernetes & Terraform (Tuần 2)

## 🎯 Mục tiêu
- Học và thực hành thành thạo Kubernetes core để thi CKA.
- Tự triển khai cụm Kubernetes thủ công (không dùng EKS).
- Triển khai ứng dụng DevOps AI WebApp lên cụm K8s thực tế.
- Làm quen GitOps (ArgoCD) để chuẩn bị triển khai GitOps trên EKS ở Phase 3.

---

## 🛠 Triển khai cụm Kubernetes thủ công
- Dùng các công cụ triển khai:
  - Minikube (ưu tiên để học local nhanh)
  - Kubeadm (setup cụm thật trên EC2 – phù hợp luyện CKA)
- Thiết lập đầy đủ:
  - Control plane, worker node
  - Kubeconfig, networking (CNI: Calico hoặc Flannel)
  - Dashboard hoặc Lens (tuỳ chọn)

---

## 🧩 Resource & Ứng dụng thực tế
- Viết YAML chuẩn K8s:
  - `Deployment`, `Service`, `Ingress`
  - `ConfigMap`, `Secret`
  - `HorizontalPodAutoscaler`
- Triển khai chatbot FE/BE (Next.js + Node.js API) lên cụm K8s của bạn
- Expose app qua Ingress với domain local hoặc custom DNS (`nip.io`, `xip.io`...)

---

## 🔁 Terraform (cập nhật)
- Sử dụng Terraform để triển khai hạ tầng host cụm K8s:
  - VPC, subnet, internet gateway, route table
  - EC2 instances (control plane + worker)
  - Security group, key pair, static IP (nếu cần)
- **Không triển khai EKS trong tháng này**

---

## 🔧 GitOps (chuẩn bị cho Phase 3)
- Làm quen với GitOps bằng ArgoCD:
  - Cài đặt ArgoCD lên cụm K8s local
  - Sync 1 ứng dụng (ví dụ FE hoặc BE) từ Git repo qua ArgoCD
  - Tìm hiểu cấu trúc GitOps repo: `apps/`, `base/`, `overlays/`
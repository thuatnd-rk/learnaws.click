# Kubernetes & Terraform (Tháng 2)

## 🎯 Mục tiêu
- Học và thực hành thành thạo Kubernetes core để thi CKA.
- Tự triển khai cụm Kubernetes (không dùng EKS).
- Triển khai ứng dụng DevOps AI WebApp lên cụm K8s.
- Làm quen GitOps (chuẩn bị cho Phase 3).

---

## 🛠 Triển khai cụm Kubernetes (không dùng EKS)
- Dùng một trong các cách:
  - Minikube (ưu tiên cho học local)
  - Kind (K8s in Docker)
  - Kubeadm (manual cluster, giống bài thi CKA)
- Setup chuẩn: control plane, worker node, CNI (Calico/Flannel), kubeconfig

---

## 🧩 Resource & Ứng dụng thực tế
- Viết YAML:
  - `Deployment`, `Service`, `Ingress`
  - `ConfigMap`, `Secret`
  - `HorizontalPodAutoscaler`
- Deploy chatbot FE/BE (Next.js + Node.js API) lên K8s cluster của bạn

---

## 🔁 Terraform (cập nhật lại)
- Vẫn triển khai:
  - VPC, EC2 (dùng để host cluster K8s thủ công)
  - Cấu hình tường lửa, subnet, static IP (nếu cần)
- Không triển khai EKS trong tháng này

---

## 🔧 GitOps (chuẩn bị cho Phase 3)
- Làm quen với ArgoCD:
  - Cài đặt ArgoCD lên cụm K8s local
  - Deploy một app đơn giản từ Git repo

---

## ✅ Gợi ý phân chia theo tuần
| Tuần | Nội dung |
|------|----------|
| Tuần 1 | Cài đặt Minikube / Kind / kubeadm, quản lý kubeconfig |
| Tuần 2 | Thực hành YAML: Pod, Deployment, Service, ConfigMap, Secret |
| Tuần 3 | Auto-scaling với HPA, setup Ingress Controller (Nginx/Traefik) |
| Tuần 4 | Deploy full chatbot WebApp vào cluster, cài thử ArgoCD |

---
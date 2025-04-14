
# ✅ Git Commit Convention for DevOps AI WebApp

## 🧠 Tổng quan
- Theo chuẩn [Conventional Commits](https://www.conventionalcommits.org/)
- Cấu trúc:
  ```
  <type>(<scope>): <short description>
  ```

---

## 🔧 `type` – Loại thay đổi

| Type         | Ý nghĩa                                                                 |
|--------------|-------------------------------------------------------------------------|
| `feat`       | Thêm chức năng mới                                                     |
| `fix`        | Sửa lỗi                                                                 |
| `docs`       | Thay đổi tài liệu (`README`, `docs/`, v.v.)                            |
| `style`      | Thay đổi về style (format, indent, CSS...) không ảnh hưởng logic       |
| `refactor`   | Tối ưu/refactor code, không thay đổi chức năng                         |
| `perf`       | Cải thiện hiệu suất                                                     |
| `test`       | Thêm/sửa test                                                           |
| `chore`      | Cấu hình, task phụ trợ (e.g. update package, cấu hình linter)          |
| `ci`         | Thay đổi liên quan CI/CD (GitHub Actions, Docker build, script...)     |
| `infra`      | Thay đổi hạ tầng: Terraform, EC2, EKS, Docker, Nginx...                |

---

## 🔍 `scope` – Phạm vi tác động (tùy chọn, nên dùng)

| Scope        | Mô tả ví dụ |
|--------------|-------------|
| `frontend`   | Giao diện Next.js hoặc Vue |
| `backend`    | API / Node.js logic |
| `chatbot`    | Logic xử lý AI Assistant |
| `infra`      | Terraform, Docker, AWS config |
| `ci`         | GitHub Actions, deploy script |
| `docs`       | File `.md`, document nội bộ |
| `style`      | Tailwind, CSS, responsive |

---

## ✍️ Ví dụ commit chuẩn

```bash
feat(chatbot): add reply history display to UI
fix(api): handle empty message input gracefully
docs(readme): add setup instructions for backend
style(frontend): adjust spacing for input box
refactor(backend): simplify chat handler logic
ci(infra): add docker build & push job to GitHub Actions
infra(terraform): update EKS node group auto-scaling config
```

---

## ✅ Gợi ý kèm theo
- **Không commit trực tiếp vào `main`**
- Mỗi PR nên có 1 hoặc vài commit có ý nghĩa rõ ràng
- Có thể squash khi merge PR để giữ lịch sử sạch

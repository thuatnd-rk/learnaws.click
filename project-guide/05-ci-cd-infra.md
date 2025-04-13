# CI/CD & Hạ tầng

## GitHub Actions Pipeline
- `on: push`
- Jobs:
  - Build Docker images
  - Push ECR
  - SSH deploy EC2

## Docker
- Dockerfile frontend
- Dockerfile backend
- docker-compose để local dev

## EC2 Deployment
- EC2 Ubuntu, cài Docker, Nginx
- `nginx.conf`: proxy /api, /app
- Certbot setup SSL tự động

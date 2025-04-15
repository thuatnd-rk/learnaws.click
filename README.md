# learnaws.click

A comprehensive learning platform for AWS services and cloud infrastructure.

## 🌐 Project Overview

**LearnAWS.Click** is a hands-on DevOps learning platform, combining interactive AI assistance with real-world infrastructure examples. Designed for aspiring Cloud Engineers and DevOps professionals.

## 🚀 Features

- 🤖 AI Chatbot (DevOps Assistant) using AWS Bedrock or OpenAI
- 🔁 CI/CD pipeline with GitHub Actions
- ☸️ Kubernetes deployment guides (EKS, Helm, ArgoCD)
- 📦 Dockerized frontend & backend (Node.js, Next.js)
- 📊 Logging & Monitoring stack (Prometheus, Grafana)
- 🧭 Structured AWS learning roadmap

## 🗺 Roadmap

**3-Month Plan**
- ✅ Month 1: Core platform, chatbot AI, Docker & CI/CD
- 🔄 Month 2: Blog CMS, staging CI/CD, infrastructure with Terraform
- ⏩ Month 3: EKS, GitOps, monitoring/logging, production-ready setup

## 🐳 Local Development with Docker

> Ensure Docker & Docker Compose are installed.

### 1. Clone repository

```bash
git clone https://github.com/thuatnd-rk/learnaws.click.git
cd learnaws.click
```

### 2. Start full-stack app

```bash
docker-compose up --build
```

### 3. Access the app

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api

### 4. Environment Variables

You can define your variables in a .env file (e.g., API keys, base URLs).

Create two separate .env files:
- `frontend/.env` - For Next.js frontend variables (prefix with NEXT_PUBLIC_ for client-side access)
- `backend/.env` - For Express backend variables

Example for backend/.env:
```
PORT=3001
AWS_REGION=us-east-1
BEDROCK_MODEL_ID=anthropic.claude-v2
```

Example for frontend/.env:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

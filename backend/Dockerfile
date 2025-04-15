# backend/Dockerfile
FROM node:22-alpine AS base

# Tạo thư mục làm việc
WORKDIR /app

# Cài đặt phụ thuộc
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# Build TypeScript
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Sản phẩm cuối cùng
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Tạo người dùng không phải root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

# Chỉ sao chép các file cần thiết
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./

# Thiết lập quyền sở hữu cho thư mục
RUN chown -R expressjs:nodejs /app

# Chuyển sang người dùng không phải root
USER expressjs

# Mở cổng để truy cập ứng dụng
EXPOSE 3001

# Chạy ứng dụng
CMD ["node", "dist/index.js"]
# frontend/Dockerfile
FROM node:20-alpine AS base

# Cài đặt các phụ thuộc cho sharp (xử lý hình ảnh trong Next.js)
RUN apk add --no-cache libc6-compat

# Tạo thư mục làm việc
WORKDIR /app

# Cài đặt phụ thuộc
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# Build ứng dụng
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Đặt biến môi trường cho build (không để lộ các biến môi trường nhạy cảm)
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Sản phẩm cuối cùng
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Tạo người dùng không phải root để chạy ứng dụng
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Thiết lập các quyền cho người dùng nextjs
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Chỉ sao chép các file build đã tạo
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Chuyển sang người dùng không phải root
USER nextjs

# Mở cổng để truy cập ứng dụng
EXPOSE 3000

# Chạy ứng dụng
CMD ["node", "server.js"]
FROM node:23-alpine AS builder
WORKDIR /app

# Copy package.json เข้าไปใน Container เพื่อติดตั้ง Package ต่างๆ
COPY package.json ./

# ติดตั้ง Package ต่างๆที่ต้องใช้
RUN npm install

# Copy code ส่วนที่เหลือเช้าไปใน Container
COPY . .

# Build Next application
RUN npm run build

# เราควรจะใช้ Base Image ตัวเดียวกับ Builder ตัวก่อนหน้าเพื่อไม่ให้มีปัญหาเรื่อง Version
FROM node:23-alpine AS runner
WORKDIR /app

# ติดตั้ง Next CLI
RUN npm install -g next

# กำหนด Environment เป็น Production
ENV NODE_ENV=production

# Copy output และ dependencies จาก Builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
# Start Next application
CMD ["npm", "run", "start"]
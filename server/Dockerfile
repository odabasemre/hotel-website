# Backend Dockerfile
FROM node:20-alpine

WORKDIR /app

# Package files
COPY package*.json ./

# Dependencies install
RUN npm ci --only=production

# Source code
COPY src ./src

# Uploads klasörü
RUN mkdir -p /app/uploads/hero /app/uploads/services /app/uploads/rooms /app/uploads/about /app/uploads/gallery /app/uploads/general

# Port
EXPOSE 5000

# Start
CMD ["node", "src/index.js"]

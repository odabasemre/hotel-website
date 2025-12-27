# Frontend Dockerfile
FROM node:20-alpine as builder

WORKDIR /app

# Package files
COPY package*.json ./

# Dependencies install
RUN npm ci

# Source code
COPY . .

# Build arguments
ARG VITE_API_URL=http://localhost:5000
ENV VITE_API_URL=$VITE_API_URL

# Build
RUN npm run build

# Production image with nginx
FROM nginx:alpine

# Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

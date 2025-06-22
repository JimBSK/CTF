FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:latest AS dist
WORKDIR /var/www/frontend
COPY --from=builder /app/build .
WORKDIR /etc/nginx
COPY ./nginx.conf .
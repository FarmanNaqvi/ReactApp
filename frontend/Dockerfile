# frontend/Dockerfile
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:alpine

# Copy built React files
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

# Copy Nginx default config (optional)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

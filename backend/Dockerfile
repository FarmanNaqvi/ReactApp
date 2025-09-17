# backend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Then copy the rest of the source code
COPY . .

# Expose port
EXPOSE 5000

# Start server
CMD ["node", "server.js"]


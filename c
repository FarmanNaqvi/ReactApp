services:
  backend:
    build:
      context: ./backend
    container_name: backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=development

  frontend:
    build:
      context: ./frontend
    container_name: frontend
    ports:
      - "80:80"   # React app served by Nginx on port 80, mapped to 3000
    depends_on:
      - backend
environment:
      - REACT_APP_API_URL=http://backend:5000/api/joke

# Dockerfile

# Stage 1: Build the application
FROM node:14 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

COPY --from=build /app/public /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

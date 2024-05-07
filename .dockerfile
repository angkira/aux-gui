# Stage 1: Build the Angular app
FROM node:14 as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

# Stage 2: Serve the built app with a lightweight HTTP server
FROM nginx:alpine

COPY --from=builder /app/dist/aux-gui /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

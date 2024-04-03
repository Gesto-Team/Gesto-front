# Node stage
FROM node:18.10-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Nginx stage
FROM nginx:1.17.1-alpine
EXPOSE 80
WORKDIR /usr/share/nginx/html

# Add www-data user and group with a different group ID
RUN addgroup -g 1000 -S www-data && \
    adduser -u 101 -D -S -G www-data www-data

# Copy built files from Node stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html/

# Set permissions for the www-data user
RUN chown -R www-data:www-data /usr/share/nginx/html

# Switch to the www-data user
USER www-data

# Start Nginx (this is the default CMD for the nginx image)
CMD ["nginx", "-g", "daemon off;"]

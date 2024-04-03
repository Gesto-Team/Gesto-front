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

# Copy built files from Node stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html/

# Remove the user directive from the Nginx configuration
RUN sed -i 's/user  nginx;//' /etc/nginx/nginx.conf

# Comment out unused module includes in the Nginx configuration
RUN sed -i 's/include \/etc\/nginx\/modules-enabled\/50-mod-http-geoip2.conf;/# include \/etc\/nginx\/modules-enabled\/50-mod-http-geoip2.conf;/' /etc/nginx/nginx.conf

# Set permissions for the Nginx user and group
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/cache/nginx/client_temp

# Start Nginx (this is the default CMD for the nginx image)
CMD ["nginx", "-g", "daemon off;"]

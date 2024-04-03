# Node

FROM node:18.10-alpine AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Nginx

FROM nginx:1.17.1-alpine

RUN addgroup -g 1000 -S www-data && adduser -u 1000 -D -S -G www-data www-data

EXPOSE 80

WORKDIR /usr/share/nginx/html

COPY --from=build /usr/src/app/dist /usr/share/nginx/html/
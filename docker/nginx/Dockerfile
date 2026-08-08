# Build React SPA
FROM node:20-alpine AS frontend-build

WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./

ARG VITE_API_URL=/api
ARG VITE_APP_URL=
ARG VITE_BRAND_NAME=TAJ JEWELRY
ARG VITE_BRAND_NAME_AR=تاج للمجوهرات

ENV VITE_API_URL=$VITE_API_URL \
    VITE_APP_URL=$VITE_APP_URL \
    VITE_BRAND_NAME=$VITE_BRAND_NAME \
    VITE_BRAND_NAME_AR=$VITE_BRAND_NAME_AR

RUN npm run build

# Nginx gateway: SPA + reverse proxy to PHP-FPM
FROM nginx:alpine

COPY docker/nginx/prod.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-build /app/dist /var/www/frontend

EXPOSE 80

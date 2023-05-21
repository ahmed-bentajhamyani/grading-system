# Build stage
FROM node:18.13.0-alpine as build
RUN mkdir -p /app

WORKDIR /app

COPY package.json /app/
RUN npm install

COPY . /app/
RUN npm run build --prod

# Prod stage
FROM nginx:alpine
COPY --from=build /app/dist/answers-grading-system-frontend /usr/share/nginx/html
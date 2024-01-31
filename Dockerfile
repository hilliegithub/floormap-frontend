FROM node:21.5.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
COPY . .
RUN npm run build
FROM nginx:stable
# RUN rm /usr/share/nginx/html/index.html
COPY default.conf /etc/nginx/conf.d
COPY --from=build /app/dist/maplayout/browser/ /usr/share/nginx/html/
EXPOSE 80
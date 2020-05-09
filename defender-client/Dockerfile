FROM node:13 AS nodebuild
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build:docker

FROM nginxinc/nginx-unprivileged:1.18.0
COPY --from=nodebuild /usr/src/app/dist/ /var/cache/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
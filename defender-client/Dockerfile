FROM node:13 AS nodebuild
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build:docker

FROM nginx:1.17.2
RUN rm -rf /usr/share/nginx/html/*
COPY --from=nodebuild /usr/src/app/dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

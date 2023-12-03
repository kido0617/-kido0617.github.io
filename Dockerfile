FROM node:lts-alpine

WORKDIR /app

RUN npm install -g hexo-cli

EXPOSE 4000
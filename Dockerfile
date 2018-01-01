FROM node:8.9.3-alpine

RUN apk update
RUN npm install -g http-server

WORKDIR /home/node

EXPOSE 8080

RUN npm install


FROM node:8.9.3-alpine

RUN apk update
RUN npm install -g http-server

WORKDIR /home/node

COPY . /home/node

RUN npm install
RUN node blossom.js

CMD node blossom.js && http-server ./blog

# EXPOSE 8080

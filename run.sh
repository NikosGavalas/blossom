#!/bin/bash

# first build with:
# docker build -t blossom .

docker rm blossom

# add -d in the options to run 'in the background' (detached)
docker run --name=blossom \
	-it \
	-p 8080:8080 \
	-v $PWD:/home/node/ \
	blossom /bin/sh -c "npm install && node blossom.js && http-server ./blog"


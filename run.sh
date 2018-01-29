#!/bin/bash

# first build with:
# docker build -t blossom .

docker rm blossom

# recommended settings to run
# add -d in the options to run 'in the background' (detached)
docker run --name=blossom \
	-v $PWD/sample_content:/home/node/sample_content \
	-it \
	-p 80:8080 \
	blossom 


# Blossom

A minimal personal blog generator.

You write your blogposts in markdown, they get rendered and integrated into a static website.

Live demo [here](https://nickgavalas.com).

## Features

- Easy deployment - no need for database
- Configurable by a simple file (config.js)
- Full markdown support plus LaTeX for math
- Search Engine optimized and Open Graph tags
- Fully Responsive for mobile view etc.
- Gravatar integration

## Quick start
Two ways. Download or git-clone the files and:
 - Either build a docker image with the provided Dockerfile with `docker build -t blossom .` and run the `run.sh` script (and visit localhost:8080 to see the website),
 - or use `npm install` to install the required packages, and run `node blossom.js` to generate the `blog/` directory, which you can then throw to any webserver's document root (e.g. Apache or Nginx) to serve it.

## Configuration

Edit the `config.js` file. The comments in the file are pretty descriptive to help you with this. 

Afterwards, go to the `content/` directory and replace the example content with yours, and run again the `blossom.js` script to get your new site generated in the `blog/` directory.

The markdown files must have filenames in the following form: __Example_Post_Title-22_Jan_2018.md__, so that files are rendered properly.

## Deployment

After generating, just throw the generated /blog directory into Apache or Nginx root or run the provided `run.sh` script to serve with docker

## About the project

I built this for myself, but I do hope it is useful to others too. For bugs and suggestions, open issues and I 'll review them.

Future dev:
- finish the meta tags
- add optional pages in the navbar (about, contact, etc...)
- make the code cleaner

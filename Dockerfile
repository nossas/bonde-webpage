FROM nginx:1.21
LABEL maintainer="tech@nossas.org"

WORKDIR /usr/share/nginx/html

COPY ./storybook-static .

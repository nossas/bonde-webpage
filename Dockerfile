FROM nginx:1.19
LABEL maintainer="tech@nossas.org"

WORKDIR /usr/share/nginx/html

COPY ./storybook-static .

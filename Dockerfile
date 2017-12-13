### STAGE 1: Build ###

FROM node:alpine

WORKDIR /ng-app

# If our package.json or npm-shrinkwrap change, it will trigger lower layers to rebuild too
COPY packag*.json npm-*.json ./

## Storing node modules on a separate layer prevents unnecessary npm installs on each build
RUN npm install

COPY . .

# Allow Parameters to be passed through to the prebuild.js script
ARG API_URL=http://localhost:8080/api

## Build the Application
RUN npm run prebuild \
    && $(npm bin)/ng build

### STAGE 2: Setup ###

FROM nginx:1.13-alpine

# NginX Configuration
COPY .docker/nginx/default.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*

COPY --from=0 /ng-app/dist /usr/share/nginx/html

FROM node:8.7.0-alpine

RUN mkdir -p /app/api
WORKDIR /app/api

COPY package.json /app/api

RUN npm install

COPY . /app/api

CMD [ "npm", "start" ]
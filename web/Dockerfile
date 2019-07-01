FROM node:8.7.0-alpine

RUN mkdir -p /app/web
WORKDIR /app/web

COPY package.json /app/web

RUN npm install

COPY . /app/web

CMD [ "npm", "start" ]
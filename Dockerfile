FROM node:10

WORKDIR /app

ADD package.json package.json

RUN npm install

ADD . .

EXPOSE 3000

RUN npm install -g nodemon

CMD [ "nodemon", "index.js" ]
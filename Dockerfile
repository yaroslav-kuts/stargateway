FROM node:10

RUN mkdir -p /usr/src/stargateway
WORKDIR /usr/src/stargateway

COPY package.json /usr/src/stargateway/
COPY package-lock.json /usr/src/stargateway/
RUN npm install

COPY . /usr/src/stargateway

EXPOSE 3000

RUN npm install -g nodemon

CMD [ "nodemon", "index.js" ]
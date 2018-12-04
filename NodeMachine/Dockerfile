FROM node:10.12-jessie

RUN ls
WORKDIR /code/NodeMachine
COPY NodeMachine/package*.json /code/NodeMachine/
ADD NodeMachine/*.js code/NodeMachine/

RUN npm install
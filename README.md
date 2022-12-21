# Natter

## Environment Setup

**Note: create .env file in client root and server root, also  add below settings for authentication to work. Should be added in "project-root/client>.env"!**

REACT_APP_FIREBASE_APIKEY=<REACT_APP_FIREBASE_APIKEY>
REACT_APP_FIREBASE_AUTHDOMAIN=<REACT_APP_FIREBASE_AUTHDOMAIN>
REACT_APP_FIREBASE_PROJECTID=<REACT_APP_FIREBASE_PROJECTID>
REACT_APP_FIREBASE_STORAGEBUCKET=<REACT_APP_FIREBASE_STORAGEBUCKET>
REACT_APP_FIREBASE_MESSAGINGSENDERID=<REACT_APP_FIREBASE_MESSAGINGSENDERID>
REACT_APP_FIREBASE_APPID=<REACT_APP_FIREBASE_APPID>
REACT_APP_FIREBASE_MEASUREMENTID=<REACT_APP_FIREBASE_MEASUREMENTID>

**Note: create .env file in project root and add below settings docker. Should be added in "project-root>.env"!**


NODE_CLIENT_LOCAL_PORT=3000
NODE_SERVER_LOCAL_PORT=3001,3002
NODE_CLIENT_DOCKER_PORT=3000
NODE_SERVER_DOCKER_PORT=3001,3002

## Build Instructions

## Start client server

project-root/client> npm start

## Start backend server

project-root/server> npm start

## The app could also run in containerized environment on docker. docker software should be installed from docker

project-root>docker-compose build

project-root>docker-compose up

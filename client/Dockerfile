# Docker Image

FROM node:16

# virtualized Docker environment directory

WORKDIR /client

# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Installs all node packages
RUN npm install

# Copies to Docker environment
COPY . .

# Uses port which is used by the actual application
EXPOSE 3000

# Finally runs the application
CMD [ "npm", "start" ]
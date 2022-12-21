# Docker Image
FROM node:16

# Install graphics magick
RUN apt-get update && apt-get install -y graphicsmagick

# Install pm2
RUN npm install -g pm2

# virtualized Docker environment directory
WORKDIR /server

# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Installs all node packages
RUN npm install

# Copies to Docker environment
COPY . .

# Uses port which is used by the actual application
EXPOSE 3001
EXPOSE 3002

# Finally runs the application
# CMD [ "npm", "start" ]
# Run the processes using pm2
CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]
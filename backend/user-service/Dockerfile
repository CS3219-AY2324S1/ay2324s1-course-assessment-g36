FROM node:18
RUN npm install -g nodemon
WORKDIR '/user-service'
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "nodemon", "index.js" ]
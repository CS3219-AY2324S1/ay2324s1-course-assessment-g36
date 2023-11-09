FROM node:16

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# RUN npm ci --omit=dev

COPY . .

ENV PORT=8000
EXPOSE 8000
CMD ["npm", "run", "dev"]
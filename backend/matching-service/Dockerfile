FROM node:16

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# RUN npm ci --omit=dev

COPY . .

ENV PORT=3002
ENV JSON_WEB_TOKEN_SECRET=token_secret
EXPOSE 3002
CMD ["npm", "start"]
FROM node:18

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# RUN npm ci --omit=dev

COPY . .

ENV PORT=5173
EXPOSE 5173
CMD ["npm", "start"]
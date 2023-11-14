FROM node:18

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
# RUN npm ci --omit=dev

COPY . .

ENV PORT=3000
EXPOSE 3000

RUN npm run build
CMD ["npm", "start"]
FROM node:18

WORKDIR /usr/src/app
COPY package*.json .
RUN npm install

# RUN npm ci --omit=dev

COPY . .

ENV PORT=8000
ENV NODE_ENV=production
ENV USER_DB_URI=users-db
ENV JSON_WEB_TOKEN_SECRET=MkyAu6gLS5qRDDRczHbqoH44YfJk8TYTnWq3f/kCszdH60kbTrJWjw==
EXPOSE 8000

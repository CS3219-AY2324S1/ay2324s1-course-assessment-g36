FROM node:18

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# RUN npm ci --omit=dev

COPY . .

ENV PORT=5173
ENV JSON_WEB_TOKEN_SECRET="MkyAu6gLS5qRDDRczHbqoH44YfJk8TYTnWq3f/kCszdH60kbTrJWjw=="
ENV OPENAI_API_KEY="<OpenAI API key>"
EXPOSE 5173
CMD ["npm", "start"]
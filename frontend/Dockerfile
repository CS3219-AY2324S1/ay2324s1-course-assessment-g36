FROM node:18

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
# RUN npm ci --omit=dev

COPY . .

ENV NEXT_PUBLIC_QUESTION_SERVICE_URI=http://localhost:3001
ENV NEXT_PUBLIC_USER_SERVICE_URI=http://localhost:8000
ENV NEXT_PUBLIC_MATCHING_SERVICE_URI=ws://localhost:3002/
ENV PORT=3000
EXPOSE 3000

RUN npm run build
CMD ["npm", "start"]
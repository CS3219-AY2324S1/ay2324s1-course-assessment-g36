FROM node:18

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# Use arguments to allow build time customization in the `docker-compose.yml`.
ARG NEXT_PUBLIC_QUESTION_SERVICE_URI=http://localhost:3001
ARG NEXT_PUBLIC_USER_SERVICE_URI=http://localhost:8000
ARG NEXT_PUBLIC_MATCHING_SERVICE_URI=ws://localhost:3002
ARG NEXT_PUBLIC_COLLABORATION_SERVICE_URI=http://localhost:5173
ARG NEXT_PUBLIC_AGORA_APP_ID=""
ARG NEXT_PUBLIC_AGORA_APP_CERTIFICATE=""
ARG NEXT_PUBLIC_CODE_EXECUTION_API_KEY=""

ENV NEXT_PUBLIC_QUESTION_SERVICE_URI=$NEXT_PUBLIC_QUESTION_SERVICE_URI
ENV NEXT_PUBLIC_USER_SERVICE_URI=$NEXT_PUBLIC_USER_SERVICE_URI
ENV NEXT_PUBLIC_MATCHING_SERVICE_URI=$NEXT_PUBLIC_MATCHING_SERVICE_URI
ENV NEXT_PUBLIC_COLLABORATION_SERVICE_URI=$NEXT_PUBLIC_COLLABORATION_SERVICE_URI
ENV NEXT_PUBLIC_AGORA_APP_ID=$NEXT_PUBLIC_AGORA_APP_ID
ENV NEXT_PUBLIC_AGORA_APP_CERTIFICATE=$NEXT_PUBLIC_AGORA_APP_CERTIFICATE
ENV NEXT_PUBLIC_CODE_EXECUTION_API_KEY=$NEXT_PUBLIC_CODE_EXECUTION_API_KEY
ENV PORT=3000

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

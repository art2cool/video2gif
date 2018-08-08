FROM mhart/alpine-node:latest

RUN mkdir -p /app
WORKDIR /app

RUN apk add --no-cache make gcc g++ python ffmpeg

COPY package*.json ./
RUN npm install 

COPY . . 

EXPOSE 8000
CMD ["node", "server.js"]

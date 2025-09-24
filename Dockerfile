FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install expo --save-dev

COPY . .

EXPOSE 8081 19000 19001 19002

CMD ["npx", "expo", "start", "--non-interactive"]

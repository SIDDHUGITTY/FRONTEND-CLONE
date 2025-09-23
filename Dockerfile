FROM node:18-alpine
WORKDIR /app
COPY . /app
RUN npm install \
    npm install expo
EXPOSE 8081
CMD ["npx", "expo", "start", "--tunnel"]


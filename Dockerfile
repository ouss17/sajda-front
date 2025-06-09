FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 19006

CMD ["npx", "expo", "start", "--tunnel", "--clear"]
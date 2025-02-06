FROM node:20.12.2

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

EXPOSE 4000

CMD [ "npm", "run", "dev" ]
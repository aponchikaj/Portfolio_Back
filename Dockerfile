FROM node:22

WORKDIR /app

COPY . .

COPY requirements*.txt .

RUN npm install

ENV PORT=3000

EXPOSE 3000

CMD [ "npm","run","start" ]
FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

CMD ["cd", "database"]

CMD ["node", "database.js"]

CMD ["node", "exchange_rate.database.js"]

CMD ["npm", "start"]
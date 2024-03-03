FROM node:20-alpine3.18

RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . .
RUN npm install

EXPOSE 5000

CMD [ "npm", "run", "dev" ]
FROM node:18

RUN mkdir -p /home/app

WORKDIR /home/app

COPY ./package.json .

RUN yarn

COPY . .

EXPOSE 3000

CMD [ "yarn", "dev" ]

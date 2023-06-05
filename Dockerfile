FROM node:16-alpine

ENV NODE_ENV=production

WORKDIR /handshakes

COPY package.json .

COPY yarn.lock .

COPY dist ./dist

RUN yarn

CMD [ "yarn", "start" ]
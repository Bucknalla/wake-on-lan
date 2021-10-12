FROM node:12-alpine

RUN apk add awake --repository=https://dl-cdn.alpinelinux.org/alpine/edge/community
RUN apk add ethtool

WORKDIR /usr/app
COPY lib/ lib/
COPY scripts scripts
COPY package.json .
COPY swagger.json .
COPY VERSION .

RUN npm install

CMD ["npm", "start"]
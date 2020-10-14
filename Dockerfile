FROM node:12.18.4-alpine

ARG SERVER_PORT=4000

WORKDIR /app

RUN apk add --no-cache --virtual .build-deps alpine-sdk python

COPY package.json newrelic.js yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
ENV SERVER_PORT=$SERVER_PORT

RUN yarn prisma:generate
RUN yarn run build && apk del .build-deps

# Remove dev dependencies
RUN yarn install --production

EXPOSE $SERVER_PORT

CMD ["node", "dist/index.js"]
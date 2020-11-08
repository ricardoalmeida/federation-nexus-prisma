FROM node:12.19.0-alpine

ARG SERVER_PORT=4001

WORKDIR /app

RUN apk add --no-cache --virtual .build-deps alpine-sdk python

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
ENV SERVER_PORT=$SERVER_PORT

RUN yarn prisma generate
RUN yarn run build && apk del .build-deps

ENV NODE_ENV=staging

# Remove dev dependencies
RUN yarn install --production

EXPOSE $SERVER_PORT

CMD ["node", "dist/src/index.js"]
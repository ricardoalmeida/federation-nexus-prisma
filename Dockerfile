### BASE ###
FROM node:12.19.0-alpine AS base

RUN apk add --no-cache --virtual .build-deps alpine-sdk python

WORKDIR /app

### BUILDER ###
FROM base AS builder

# Install production dependencies
COPY *.json yarn.lock ./

RUN yarn install --production --pure-lockfile
RUN cp -RL node_modules/ /tmp/node_modules

# Install all dependencies
RUN yarn install --pure-lockfile

# Copy source files
COPY src/ ./src/
COPY prisma/ ./prisma/
COPY generated/ ./generated/

# Build
RUN yarn run build

### RUNNER ###
FROM base

# Copy runtime dependencies
COPY --from=builder /tmp/node_modules/ ./node_modules/
COPY --from=builder /app/node_modules/@prisma/client/ ./node_modules/@prisma/client/
COPY --from=builder /app/node_modules/.prisma/client/ ./node_modules/.prisma/client/

# Copy runtime project
COPY --from=builder /app/dist/ ./dist/src/
COPY package.json ./

USER node
ENV NODE_ENV=staging
ARG SERVER_PORT=4001
ENV SERVER_PORT=$SERVER_PORT
EXPOSE $SERVER_PORT

CMD ["node", "dist/src/index.js"]

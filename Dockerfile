### BASE ###
FROM node:12.19.0-alpine AS base

RUN apk add --no-cache --virtual .build-deps alpine-sdk python

WORKDIR /app

### BUILDER ###
FROM base AS builder

# Install production dependencies
COPY *.json yarn.lock ./
# COPY packages/shared/*.json ./packages/shared/
COPY packages/gateway/*.json ./packages/gateway/
COPY packages/vitrola/*.json ./packages/vitrola/

RUN yarn install --production --pure-lockfile
RUN cp -RL node_modules/ /tmp/node_modules

# Install all dependencies
RUN yarn install --pure-lockfile

# Copy source files
# COPY packages/shared/ ./packages/shared/
COPY packages/gateway/ ./packages/gateway/
COPY packages/vitrola/ ./packages/vitrola/

# Build
# RUN yarn --cwd ./packages/shared/ build
RUN yarn --cwd ./packages/gateway/ build
RUN yarn --cwd ./packages/vitrola/ generate
RUN yarn --cwd ./packages/vitrola/ build

### RUNNER ###
FROM base

# Copy runtime dependencies
COPY --from=builder /tmp/node_modules/ ./node_modules/
COPY --from=builder /app/packages/vitrola/node_modules/@prisma/client/ ./node_modules/@prisma/client/
COPY --from=builder /app/packages/vitrola/node_modules/.prisma/client/ ./node_modules/.prisma/client/
# COPY --from=builder /app/packages/shared/dist ./node_modules/shared/dist/
COPY --from=builder /app/packages/gateway/dist ./node_modules/gateway/dist/

# Copy runtime project
COPY --from=builder /app/packages/vitrola/dist/src/ ./src/
COPY packages/vitrola/package.json ./

USER node
ENV NODE_ENV=staging
ARG SERVER_PORT=4001
ENV SERVER_PORT=$SERVER_PORT
EXPOSE $SERVER_PORT

CMD ["node", "dist/src/index.js"]

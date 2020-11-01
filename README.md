# GraphQL Federation Server using Prisma 2 and Nexus Schema

## Development

If you use VSCode, you can install the plugin: <https://marketplace.visualstudio.com/items?itemName=Prisma.prisma>

### Install dependencies

```bash
yarn install
```

### Run Postgres database via Docker

```bash
yarn postgres:start
```

### Execute db migrations

```bash
yarn db:migrate:up
```

### Start the GraphQL Server (Service)

```bash
yarn dev
```

The server is available in <http://localhost:4001/graphql>.

### Start the GraphQL Gateway

```bash
yarn gateway
```

The GraphQL Playground is available in <http://localhost:4000/graphql>.

### Integration tests

Tests are running in Jest, validating from GraphQL endpoint to operations in Postgres. So make sure you have the db up and running.

```bash
yarn postgres:start
yarn test
```

## Authentication & Authorization

Gateway authenticates and send proper headers to the service. The service uses graphql-shield to verify permissions.

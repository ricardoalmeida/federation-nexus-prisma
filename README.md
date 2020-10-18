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

### Start the GraphQL server

```bash
cp .env.template .env
yarn dev
```

The server is available in <http://localhost:4001/graphql>.

### Integration tests

Tests are running in Jest, validating from GraphQL endpoint to operations in Postgres. So make sure you have the db up and running.

```bash
yarn postgres:start
yarn test
```

## Authentication & Authorization

If you try to use queries and mutations you will get the error:

```graphql
query playlist {
  playlist(where: { id: 1}) {
    id
    tracks {
      id
    }
  }
}

# ==> Run
{
  "errors": [
    {
      "message": "you must be logged in",
```

This is because the GraphQL playground is available via [Apollo Gateway](https://github.com/ricardoalmeida/apollo-gateway) project. Please check this repository for instructions how to get it running.

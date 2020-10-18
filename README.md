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

The server is available in <http://localhost:4000/graphql>

### Integration tests

```bash
yarn test
```

## Authentication && Authorization

I assume the authentication will be in Apollo Gateway and the request to services have userId and permissions already set.

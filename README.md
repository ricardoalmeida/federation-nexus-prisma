# GraphQL Apollo Federation, Prisma and Nexus-Schema

This example is an GraphQL server implementation in TypeScript using [Apollo Federation](https://www.apollographql.com/docs/federation/), [Prisma](prisma.io) and [Nexus-Schema](https://nexusjs.org/). It uses Postgres database.

## How to use

### 1. Download and install dependencies

Clone this repository:

```
git clone git@github.com:ricardoalmeida/federation-nexus-prisma.git
```

Install yarn dependencies:

```bash
cd federation-nexus-prisma
yarn install
```

### 2. Start Postgres via Docker

```bash
yarn lerna run postgres:start
```

### 3. Run db migrations

Fail :(

### 4. Start Service and Gateway

Vitrola (Service)

```bash
yarn start-services
```

Gateway Server

```bash
yarn start-gateway
```

The GraphQL Playground is available in <http://localhost:4000/graphql>.

## Using the GraphQL API

<details>
  <summary>Try it out!</summary>
  <p>

```graphql
mutation createTrack {
  createOneTrack(data: { name: "Favorite Track" }) {
    id
    name
  }
}

mutation createPlaylist {
  createOnePlaylist(data: { description: "My playlist" }) {
    id
  }
}

query playlists {
  playlists {
    id
    description
    tracks {
      id
    }
  }
}

query playlist {
  playlist(where: { id: 1 }) {
    id
    tracks {
      id
    }
  }
}
```

  </p>
</details>

## Development

If you use VSCode, install plugin for Prisma: <https://marketplace.visualstudio.com/items?itemName=Prisma.prisma>

### Integration tests

GraphQL queries and mutations are using Postgres for an integration test validation. So make sure you have the db up and running.

```bash
yarn postgres:start
yarn lerna run test --stream
```

<details>
  <summary>SUCCESS</summary>
  <p>

```bash
$ /Users/ricardoalmeida/dev/federation-nexus-prisma/node_modules/.bin/lerna run test --stream
lerna notice cli v3.22.1
lerna info versioning independent
lerna info Executing command in 1 package: "yarn run test"
vitrola: $ jest
vitrola: PASS tests/mutations/createOnePlaylist.test.ts (6.563 s)
vitrola:   ● Console
vitrola:     console.info
vitrola:       Enabling inline tracing for this federated service. To disable, use ApolloServerPluginInlineTraceDisabled.
vitrola:       at ApolloServer.ensurePluginInstantiation (node_modules/apollo-server-core/src/ApolloServer.ts:909:21)
vitrola:     console.info
vitrola:       Enabling inline tracing for this federated service. To disable, use ApolloServerPluginInlineTraceDisabled.
vitrola:       at ApolloServer.ensurePluginInstantiation (node_modules/apollo-server-core/src/ApolloServer.ts:909:21)
vitrola: PASS tests/queries/playlist.test.ts (7.228 s)
vitrola:   ● Console
vitrola:     console.info
vitrola:       Enabling inline tracing for this federated service. To disable, use ApolloServerPluginInlineTraceDisabled.
vitrola:       at ApolloServer.ensurePluginInstantiation (node_modules/apollo-server-core/src/ApolloServer.ts:909:21)
vitrola:     console.info
vitrola:       Enabling inline tracing for this federated service. To disable, use ApolloServerPluginInlineTraceDisabled.
vitrola:       at ApolloServer.ensurePluginInstantiation (node_modules/apollo-server-core/src/ApolloServer.ts:909:21)
vitrola: Test Suites: 2 passed, 2 total
vitrola: Tests:       4 passed, 4 total
vitrola: Snapshots:   4 passed, 4 total
vitrola: Time:        7.908 s, estimated 9 s
vitrola: Ran all test suites.
lerna success run Ran npm script 'test' in 1 package in 9.9s:
lerna success - vitrola
✨  Done in 11.22s.
```

  </p>
</details>

## Authentication & Authorization

The Gateway authenticates the user (TODO) and send proper headers to the service. The service uses graphql-shield to verify permissions.

## Lerna Issues

### Prisma generate

```bash
cd services/vitrola
yarn prisma generate
```

<details>
  <summary>SUCCESS</summary>
  <p>

```bash
$ /Users/ricardoalmeida/dev/federation-nexus-prisma/services/vitrola/node_modules/.bin/prisma generate
Environment variables loaded from ./prisma/.env
Prisma schema loaded from prisma/schema.prisma

✔ Generated Prisma Client (version: 2.10.0) to ./node_modules/@prisma/client in 48ms

You can now start using Prisma Client in your code:

```

import { PrismaClient } from '@prisma/client'
// or const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

```

Explore the full API: http://pris.ly/d/client
✨  Done in 2.11s.
```

  </p>
</details>

### Yarn Build

```bash
yarn lerna run build
```

<details>
  <summary>SUCCESS</summary>
  <p>

```bash
yarn run v1.22.10
$ /Users/ricardoalmeida/dev/federation-nexus-prisma/node_modules/.bin/lerna run build
lerna notice cli v3.22.1
lerna info versioning independent
lerna info Executing command in 1 package: "yarn run build"
lerna info run Ran npm script 'build' in 'vitrola' in 6.1s:
$ yarn -s clean && yarn -s generate && tsc
lerna success run Ran npm script 'build' in 1 package in 6.1s:
lerna success - vitrola
✨  Done in 7.36s.

```

  </p>
</details>

### Prisma Migrate

```bash
yarn lerna run db:migrate:up
```

<details>
  <summary>ERROR!</summary>
  <p>

```bash
yarn run v1.22.10
$ /Users/ricardoalmeida/dev/federation-nexus-prisma/node_modules/.bin/lerna run db:migrate:up
lerna notice cli v3.22.1
lerna info versioning independent
lerna info Executing command in 1 package: "yarn run db:migrate:up"
lerna ERR! yarn run db:migrate:up exited 1 in 'vitrola'
lerna ERR! yarn run db:migrate:up stdout:
$ yarn prisma migrate up --experimental
$ /Users/ricardoalmeida/dev/federation-nexus-prisma/services/vitrola/node_modules/.bin/prisma migrate up --experimental
Prisma schema loaded from prisma/schema.prisma
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

lerna ERR! yarn run db:migrate:up stderr:
Environment variables loaded from ./prisma/.env
Error: Error in migration engine.
Reason: [libs/sql-schema-describer/src/walkers.rs:214:27] index out of bounds: the len is 0 but the index is 0

Please create an issue in the migrate repo with
your `schema.prisma` and the prisma command you tried to use 🙏:
<https://github.com/prisma/migrate/issues/new>

error Command failed with exit code 1.
error Command failed with exit code 1.

lerna ERR! yarn run db:migrate:up exited 1 in 'vitrola'
error Command failed with exit code 1.
info Visit <https://yarnpkg.com/en/docs/cli/run> for documentation about this command.

```

</p>
</details>

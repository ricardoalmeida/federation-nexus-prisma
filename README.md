# GraphQL Federation Server using Prisma 2 and Nexus Schema

## Development

If you use VSCode, you can install the plugin: <https://marketplace.visualstudio.com/items?itemName=Prisma.prisma>

### Install dependencies

```bash
yarn install
```

### Run Postgres database via Docker

```bash
yarn lerna run postgres:start
```

### Execute db migrations

Fail :(

### Start the GraphQL Server (Service)

```bash
yarn start-services
```

The server is available in <http://localhost:4001/graphql>.

### Start the GraphQL Gateway

```bash
yarn start-gateway
```

The GraphQL Playground is available in <http://localhost:4000/graphql>.

### Integration tests

Tests are running in Jest, validating from GraphQL endpoint to operations in Postgres. So make sure you have the db up and running.

```bash
yarn postgres:start
yarn lerna run test --stream (Pass ok)
```

## Authentication & Authorization

Gateway authenticates and send proper headers to the service. The service uses graphql-shield to verify permissions.

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
  <summary>ERROR!</summary>
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

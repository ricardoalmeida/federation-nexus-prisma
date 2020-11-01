# GraphQL Federation Server using Prisma 2 and Nexus Schema

## Development

If you use VSCode, you can install the plugin: <https://marketplace.visualstudio.com/items?itemName=Prisma.prisma>

### Install dependencies

```bash
yarn install
```

### Run Postgres database via Docker

```bash
yarn vitrola postgres:start
```

### Execute db migrations

Fail :(

```bash
yarn vitrola db:migrate:up
```

### Start the GraphQL Server (Service)

```bash
yarn vitrola dev
```

The server is available in <http://localhost:4001/graphql>.

### Start the GraphQL Gateway

```bash
yarn gateway dev
```

The GraphQL Playground is available in <http://localhost:4000/graphql>.

### Integration tests

Tests are running in Jest, validating from GraphQL endpoint to operations in Postgres. So make sure you have the db up and running.

```bash
yarn vitrola postgres:start
yarn vitrola test
```

<details>
  <summary>SUCCESS</summary>
  <p>

```bash
yarn run v1.22.10
$ yarn workspace vitrola test
$ jest
Test Suites: 2 passed, 2 total
Tests:       4 passed, 4 total
Snapshots:   4 passed, 4 total
Time:        13.068 s
Ran all test suites.
✨  Done in 15.62s.
```

  </p>
</details>

## Authentication & Authorization

Gateway authenticates and send proper headers to the service. The service uses graphql-shield to verify permissions.

## Yarn Workspace Issues

### Prisma generate

```bash
yarn vitrola prisma generate
```

<details>
  <summary>SUCCESS</summary>
  <p>

```bash
yarn run v1.22.10
$ yarn workspace vitrola prisma generate
$ /Users/ricardoalmeida/dev/federation-nexus-prisma/node_modules/.bin/prisma generate
Environment variables loaded from /Users/ricardoalmeida/dev/federation-nexus-prisma/vitrola/.env
Environment variables loaded from ./prisma/.env
Prisma schema loaded from prisma/schema.prisma

✔ Generated Prisma Client (version: 2.10.0) to ./../node_modules/@prisma/client in 67ms
...

Explore the full API: http://pris.ly/d/client
✨  Done in 2.18s.
```

  </p>
</details>

### Yarn Build

```bash
yarn vitrola build
```

<details>
  <summary>SUCCESS</summary>
  <p>

```bash
yarn run v1.22.10
$ yarn workspace vitrola build
$ yarn -s clean && yarn -s generate && tsc
✨  Done in 9.83s.
```

  </p>
</details>

### Prisma Migrate

```bash
yarn vitrola prisma migrate --experimental up
```

<details>
  <summary>ERROR!</summary>
  <p>
yarn run v1.22.10
$ yarn workspace vitrola prisma migrate --experimental up
$ /Users/ricardoalmeida/dev/federation-nexus-prisma/node_modules/.bin/prisma migrate --experimental up
Environment variables loaded from /Users/ricardoalmeida/dev/federation-nexus-prisma/vitrola/.env
Environment variables loaded from ./prisma/.env
Prisma schema loaded from prisma/schema.prisma
Oops, an unexpected error occured!
Error in migration engine.
Reason: [libs/sql-schema-describer/src/walkers.rs:214:27] index out of bounds: the len is 0 but the index is 0

Please create an issue in the migrate repo with
your `schema.prisma` and the prisma command you tried to use 🙏:
<https://github.com/prisma/migrate/issues/new>

Please help us improve Prisma by submitting an error report.
Error reports never contain personal or other sensitive information.
Learn more: <https://pris.ly/d/telemetry>

✖ Submit error report › Yes
✖ Would you like to create a Github issue? › Yes
error Command failed with exit code 1.
info Visit <https://yarnpkg.com/en/docs/cli/run> for documentation about this command.
error Command failed.
Exit code: 1
Command: /Users/ricardoalmeida/.asdf/installs/nodejs/12.19.0/bin/node
Arguments: /usr/local/Cellar/yarn/1.22.10/libexec/lib/cli.js prisma migrate --experimental up
Directory: /Users/ricardoalmeida/dev/federation-nexus-prisma/vitrola
Output:

info Visit <https://yarnpkg.com/en/docs/cli/workspace> for documentation about this command.
error Command failed with exit code 1.
info Visit <https://yarnpkg.com/en/docs/cli/run> for documentation about this command.

  </p>
</details>

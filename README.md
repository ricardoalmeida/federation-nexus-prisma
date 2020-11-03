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
docker-compose up -d
```

### 3. Run db migrations

Fail :(

```bash
yarn vitrola db:migrate:up
```

### 4. Start Service and Gateway

Vitrola (Service)

```bash
yarn vitrola dev
```

Gateway Server

```bash
yarn gateway dev
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

The Gateway authenticates the user (TODO) and send proper headers to the service. The service uses graphql-shield to verify permissions.

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

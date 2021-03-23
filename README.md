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

```bash
yarn prisma:migrate
```

### 4. Start Service and Gateway

Vitrola (Service)

```bash
yarn dev
```

Gateway Server

```bash
yarn gateway
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
yarn test
```

## Authentication & Authorization

The Gateway authenticates the user (TODO) and send proper headers to the service. The service uses graphql-shield to verify permissions.

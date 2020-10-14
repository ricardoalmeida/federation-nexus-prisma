# Share Music backend

This is a showcase application using Apollo GraphQL Federation, Nexus-Schema and Prisma.

The goal covers:

-   Data Modeling
-   CRUD
-   Testing
-   Authorization (TODO)

## Development

If you use VSCode, you can install the plugin: <https://marketplace.visualstudio.com/items?itemName=Prisma.prisma>

Copy .env.template file to .env

```bash
yarn install
yarn postgres:start
yarn db:migrate:up
yarn dev
```

### Integration tests

```bash
yarn test
```

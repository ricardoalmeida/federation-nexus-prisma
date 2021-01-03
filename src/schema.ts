import { applyMiddleware } from 'graphql-middleware';
import { transformSchemaFederation } from 'graphql-transform-federation';
import { makeSchema } from 'nexus';
import { nexusPrisma } from 'nexus-plugin-prisma';
import path from 'path';
import * as allTypes from './resolvers';
import { permissions } from './utils/permissions';

const schema = makeSchema({
  types: [allTypes],
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: path.join(process.cwd(), './generated/schema.graphql'),
    typegen: path.join(__dirname, '../../node_modules/@types/nexus-typegen/index.d.ts'),
  },
  contextType: {
    module: path.join(__dirname, 'types.ts'),
    export: 'Context',
    alias: 'ctx',
  },
  sourceTypes: {
    modules: [
      {
        module: require.resolve('.prisma/client/index.d.ts'),
        alias: 'prisma',
      },
    ],
  },
});

const federatedSchema = applyMiddleware(
  transformSchemaFederation(schema, {
    Query: {
      extend: true,
    },
    User: {
      extend: true,
      keyFields: ['id'],
      fields: {
        id: {
          external: true,
        },
      },
    },
  }),
  permissions,
);

export default federatedSchema;

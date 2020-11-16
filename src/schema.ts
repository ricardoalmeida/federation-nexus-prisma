import { makeSchema } from '@nexus/schema';
import { applyMiddleware } from 'graphql-middleware';
import { transformSchemaFederation } from 'graphql-transform-federation';
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
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '.prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
});

const federatedSchema = applyMiddleware(
  transformSchemaFederation(schema, {
    Query: {
      extend: true,
    },
  }),
  permissions,
);

export default federatedSchema;

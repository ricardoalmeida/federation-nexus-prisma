import { makeSchema, mutationType, objectType, queryType } from '@nexus/schema';
import { applyMiddleware } from 'graphql-middleware';
import { transformSchemaFederation } from 'graphql-transform-federation';
import { nexusPrisma } from 'nexus-plugin-prisma';
import path from 'path';
import { permissions } from './utils/permissions';

export const Playlist = objectType({
  name: 'Playlist',
  definition(t) {
    t.model.id();
    t.model.description();
    t.model.tracks({ type: 'Track' });
  },
});

export const Track = objectType({
  name: 'Track',
  definition(t) {
    t.model.id();
    t.model.name();
  },
});

const Query = queryType({
  definition(t) {
    t.crud.playlist();
    t.crud.playlists({ pagination: true, filtering: true });
  },
});

const Mutation = mutationType({
  definition(t) {
    t.crud.createOnePlaylist();
    t.crud.updateOnePlaylist();
    t.crud.deleteOnePlaylist();
    t.crud.createOneTrack();
    t.crud.updateOneTrack();
    t.crud.deleteOneTrack();
  },
});

const schema = makeSchema({
  types: [Query, Mutation, Playlist, Track],
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: path.join(process.cwd(), './generated/schema.graphql'),
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

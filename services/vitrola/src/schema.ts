import { makeSchema, mutationType, objectType, queryType } from '@nexus/schema';
import { applyMiddleware } from 'graphql-middleware';
import { transformSchemaFederation } from 'graphql-transform-federation';
import { nexusPrisma } from 'nexus-plugin-prisma';
import path from 'path';
import { Context } from './context';
import { permissions } from './utils/permissions';

export const Playlist = objectType({
  name: 'Playlist',
  definition(t) {
    t.model.id();
    t.model.description();
    t.model.userId();
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
    t.crud.createOnePlaylist({
      alias: 'createPlaylist',
      async resolve(root: any, args: any, ctx: Context, info: any, originalResolve: any) {
        args = {
          ...args,
          data: {
            ...args.data,
            userId: ctx.userId,
          },
        };
        const res = await originalResolve(root, args, ctx, info);
        return res;
      },
    });
    t.crud.updateOnePlaylist();
    t.crud.deleteOnePlaylist({ alias: 'deletePlaylist' });
    t.crud.createOneTrack();
    t.crud.updateOneTrack();
    t.crud.deleteOneTrack({ alias: 'deleteTrack' });
  },
});

const schema = makeSchema({
  types: [Query, Mutation, Playlist, Track],
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: path.join(process.cwd(), './generated/schema.graphql'),
    typegen: path.join(__dirname, '../../../node_modules/@types/nexus-typegen/index.d.ts'),
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

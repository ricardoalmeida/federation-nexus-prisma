import { extendType, inputObjectType, objectType, unionType } from 'nexus';

export const Playlist = objectType({
  name: 'Playlist',
  definition(t) {
    t.model.id();
    t.model.description();
    t.model.userId();
    t.model.tracks();
  },
});

export const Track = objectType({
  name: 'Track',
  definition(t) {
    t.model.id();
    t.model.name();
  },
});

export const PlaylistTrack = objectType({
  name: 'PlaylistTrack',
  definition(t) {
    t.model.id();
    t.model.addedAt();
    t.model.playlist();
    t.model.playlistId();
    t.model.trackId();
  },
});

export const PlaylistCreateInput = inputObjectType({
  name: 'PlaylistCreateInput',
  definition(t) {
    t.nonNull.string('description');
  },
});
export const PlaylistError = objectType({
  name: 'PlaylistError',
  definition(t) {
    t.string('message');
    t.string('code');
  },
});

export const PlaylistOrError = unionType({
  name: 'PlaylistOrError',
  definition(t) {
    t.members(Playlist, PlaylistError);
  },
  resolveType(data) {
    return 'code' in data ? 'PlaylistError' : 'Playlist';
  },
});

export const User = extendType({
  type: 'User',
  definition(t) {
    t.id('id');
    t.list.field('playlists', {
      type: Playlist,
      async resolve(user, _args, ctx) {
        return await ctx.prisma.playlist.findMany({
          where: { userId: user.id },
        });
      },
    });
  },
});

import { extendType, objectType } from '@nexus/schema';

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
    t.id('id');
    t.model.name();
  },
});

export const User = extendType({
  type: 'User',
  definition(t) {
    t.id('id');
    t.field('playlists', {
      type: Playlist,
      async resolve(user, args, ctx) {
        return await ctx.prisma.playlist.findMany({
          where: { userId: user.id },
        });
      },
    });
  },
});

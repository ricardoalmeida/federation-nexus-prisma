import { AuthenticationError } from 'apollo-server-express';
import { or, rule, shield } from 'graphql-shield';

const isAuthenticated = rule({ cache: 'contextual' })(async (parent, args, ctx) => ctx.userId > 0);

const isAdmin = rule({ cache: 'contextual' })(async (parent, args, ctx) =>
  ctx.permissions.has('admin'),
);

export const permissions = shield(
  {
    Query: {
      playlists: or(isAuthenticated, isAdmin),
      playlist: or(isAuthenticated, isAdmin),
    },
    Mutation: {
      createPlaylist: isAuthenticated,
      updateOnePlaylist: isAuthenticated,
      deleteOnePlaylist: isAuthenticated,
      createOneTrack: isAuthenticated,
      updateOneTrack: isAuthenticated,
      deleteOneTrack: isAuthenticated,
    },
  },
  {
    allowExternalErrors: true,
    fallbackError: new AuthenticationError('you must be logged in'),
  },
);

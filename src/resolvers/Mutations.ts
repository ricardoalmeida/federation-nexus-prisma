import { arg, mutationType, nonNull } from 'nexus';
import { Context } from '../context';
import { ApplicationErrors, PrismaErrors } from '../utils/errors';
import { PlaylistCreateInput, PlaylistOrError } from './types';

export const Mutation = mutationType({
  definition(t) {
    t.nonNull.field('createPlaylist', {
      type: PlaylistOrError,
      args: {
        data: nonNull(arg({ type: PlaylistCreateInput })),
      },
      async resolve(parent: any, { data }, ctx: Context) {
        try {
          const newPlaylist = await ctx.prisma.playlist.create({
            data: {
              ...data,
              userId: ctx.userId,
            },
          });
          return newPlaylist;
        } catch (e) {
          if (e.code === PrismaErrors.ConstraintError) {
            return {
              code: ApplicationErrors.ConstraintError,
              message: 'Playlist already taken',
            };
          }
          return {
            code: ApplicationErrors.InternalServerError,
            message: 'Sorry something went wrong.',
          };
        }
      },
    });
    t.crud.updateOnePlaylist();
    t.crud.deleteOnePlaylist({ alias: 'deletePlaylist' });
    t.crud.createOneTrack();
    t.crud.updateOneTrack();
    t.crud.deleteOneTrack({ alias: 'deleteTrack' });
  },
});

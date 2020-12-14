import { mutationType } from 'nexus';
import { Context } from '../context';

export const Mutation = mutationType({
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

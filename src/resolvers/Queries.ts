import { queryType } from '@nexus/schema';

export const Query = queryType({
  definition(t) {
    t.crud.playlist();
    t.crud.playlists({ pagination: true, filtering: true });
  },
});

import { objectType } from '@nexus/schema';

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

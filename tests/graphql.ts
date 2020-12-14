import gql from 'graphql-tag';

export const createPlaylist = gql`
  mutation createPlaylist($data: PlaylistCreateInput!) {
    createPlaylist(data: $data) {
      ... on Playlist {
        id
        userId
      }
    }
  }
`;

export const getPlaylist = gql`
  query playlist($where: PlaylistWhereUniqueInput!) {
    playlist(where: $where) {
      id
      description
    }
  }
`;

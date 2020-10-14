import gql from 'graphql-tag';

export const createPlaylist = gql`
  mutation createPlaylist($data: PlaylistCreateInput!) {
    createOnePlaylist(data: $data) {
      id
    }
  }
`;

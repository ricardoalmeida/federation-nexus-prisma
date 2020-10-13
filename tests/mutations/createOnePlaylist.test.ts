import { createTestClient } from 'apollo-server-testing';
import { constructTestServer } from '../__utils';
import { createContext } from '../../src/context';
import gql from 'graphql-tag';

const { prisma } = createContext();
afterAll(async () => {
    await prisma.$disconnect();
});

const CREATE_PLAYLIST = gql`
    mutation createPlaylist($data: PlaylistCreateInput!) {
        createOnePlaylist(data: $data) {
            id
        }
    }
`;

describe('createOnePlaylist', () => {
    test('true', async () => {
        const { server } = constructTestServer({
            context: () => ({ prisma }),
        });
        const { mutate } = createTestClient(server);
        const res = await mutate({
            mutation: CREATE_PLAYLIST,
            variables: {
                data: {
                    description: 'My playlist',
                },
            },
        });
        expect(res).toMatchInlineSnapshot(`
            Object {
              "data": Object {
                "createOnePlaylist": Object {
                  "id": 1,
                },
              },
              "errors": undefined,
              "extensions": undefined,
              "http": Object {
                "headers": Headers {
                  Symbol(map): Object {},
                },
              },
            }
        `);
    });
});

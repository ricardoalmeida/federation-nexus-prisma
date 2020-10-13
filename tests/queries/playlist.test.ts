import { createTestClient } from 'apollo-server-testing';
import { constructTestServer } from '../__utils';
import { createContext } from '../../src/context';
import gql from 'graphql-tag';

const { prisma } = createContext();
afterAll(async () => {
    await prisma.$disconnect();
});

const PLAYLIST = gql`
    query playlist($where: PlaylistWhereUniqueInput!) {
        playlist(where: $where) {
            id
            description
        }
    }
`;

beforeAll(async () => {
    await prisma.playlist.create({
        data: {
            description: 'Playlist description',
        },
    });
});

describe('playlist', () => {
    test('returns a playlist', async () => {
        const { server } = constructTestServer({
            context: () => ({ prisma }),
        });
        const { query } = createTestClient(server);
        const res = await query({
            query: PLAYLIST,
            variables: {
                where: {
                    id: 1,
                },
            },
        });
        expect(res).toMatchInlineSnapshot(`
            Object {
              "data": Object {
                "playlist": Object {
                  "description": "Playlist description",
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

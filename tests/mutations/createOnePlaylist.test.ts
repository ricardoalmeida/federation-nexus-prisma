import { createTestClient } from 'apollo-server-testing';
import { constructTestServer } from '../__utils';
import { createContext } from '../../src/context';
import { createPlaylist } from '../graphql';

const { prisma } = createContext();
afterAll(async () => {
  await prisma.$disconnect();
});

describe('createOnePlaylist', () => {
  test('creates one playlist', async () => {
    const { server } = constructTestServer({
      context: () => ({ prisma }),
    });
    const { mutate } = createTestClient(server);
    const res = await mutate({
      mutation: createPlaylist,
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

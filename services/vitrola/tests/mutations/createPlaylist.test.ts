import { createTestClient } from 'apollo-server-testing';
import { constructTestServer } from '../__utils';
import { createContext } from '../../src/context';
import { createPlaylist } from '../graphql';

const { prisma, userId, permissions } = createContext({
  req: { headers: { 'user-id': '123456' } },
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('createPlaylist', () => {
  test('rejects not logged user', async () => {
    const { server } = constructTestServer({
      context: () => ({ prisma, userId: 0, permissions }),
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
        "data": null,
        "errors": Array [
          [GraphQLError: you must be logged in],
        ],
        "extensions": undefined,
        "http": Object {
          "headers": Headers {
            Symbol(map): Object {},
          },
        },
      }
    `);
  });

  test('creates successfully', async () => {
    const { server } = constructTestServer({
      context: () => ({ prisma, userId, permissions }),
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
          "createPlaylist": Object {
            "id": 1,
            "userId": "123456",
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

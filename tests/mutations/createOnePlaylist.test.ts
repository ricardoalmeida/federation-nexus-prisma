import { createTestClient } from 'apollo-server-testing';
import { constructTestServer } from '../__utils';
import { createContext } from '../../src/context';
import { createPlaylist } from '../graphql';

const { prisma } = createContext({});
afterAll(async () => {
  await prisma.$disconnect();
});

describe('createOnePlaylist', () => {
  test('not logged user', async () => {
    const { server } = constructTestServer({
      context: () => ({ prisma, userId: 0, scopes: new Set<string>(['gateway']) }),
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

  test('creates one playlist', async () => {
    const { server } = constructTestServer({
      context: () => ({ prisma, userId: 1, scopes: new Set<string>(['gateway']) }),
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

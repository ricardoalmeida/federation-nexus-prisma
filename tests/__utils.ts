import { ApolloServer } from 'apollo-server-express';
import { schema } from '../src/schema';

export const constructTestServer = ({ context = {} } = {}): { server: ApolloServer } => {
  const server = new ApolloServer({
    schema,
    context,
  });

  return { server };
};

import { ApolloServer } from 'apollo-server-express';
import federatedSchema from '../src/schema';

export const constructTestServer = ({ context = {} } = {}): { server: ApolloServer } => {
  const server = new ApolloServer({
    schema: federatedSchema,
    context,
  });

  return { server };
};

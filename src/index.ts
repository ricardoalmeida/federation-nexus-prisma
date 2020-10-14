import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { createContext } from './context';
import federatedSchema from './schema';

const server = new ApolloServer({
  schema: federatedSchema,
  context: createContext,
  tracing: true,
});

const port = process.env.SERVER_PORT || 4001;
async function run() {
  const app = express();
  server.applyMiddleware({ app });
  app.listen({ port }, () => {
    console.log(`🚀 Server ${process.env.NODE_ENV} ready at http://localhost:${port}/graphql`);
  });
}

run();

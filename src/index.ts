import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createContext } from "./context";
import { schema } from "./schema";

const server = new ApolloServer({
  schema,
  context: createContext,
  tracing: true,
});

const port = process.env.PORT || 4000;
async function run() {
  const app = express();
  server.applyMiddleware({ app });
  app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  });
}

run();

import { ApolloServer } from "apollo-server-express";
import { schema } from "../src/schema";

export const constructTestServer = ({ context = {} } = {}) => {
  const server = new ApolloServer({
    schema,
    context,
  });

  return { server };
};

const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  constructor(opts: any) {
    super(opts);
  }
  willSendRequest({ request, context }: { request: any; context: any }) {
    request.http.headers.set('user-id', context.userID);
  }
}

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'vitrola', url: 'http://localhost:4001/graphql' },
    { name: 'users-service', url: 'http://localhost:4002/graphql' },
  ],
  buildService({ url }: { url: string }) {
    return new AuthenticatedDataSource({ url });
  },
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  context: ({ req }: any) => {
    const token = req.headers.authorization || '';

    // parse JWT into scope and user identity
    // const userID = getUserId(token);
    const userID = '1';

    return { userID };
  },
});

const port = 4000;
async function run() {
  const app = express();
  server.applyMiddleware({ app });
  app.listen({ port }, () => {
    console.log(`🚀 Gateway ${process.env.NODE_ENV} ready at http://localhost:${port}/graphql`);
  });
}

run();

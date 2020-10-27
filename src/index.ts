import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { createContext, prisma } from './context';
import federatedSchema from './schema';
import { isProd } from './utils/constants';

const server = new ApolloServer({
  schema: federatedSchema,
  formatError: (err) => {
    const errorReport = {
      message: err.message,
      locations: err.locations,
      path: err.path,
      stacktrace: err.extensions?.exception?.stacktrace || [],
      code: err.extensions?.code,
    };
    console.error('GraphQL Error', errorReport);
    if (errorReport.code == 'INTERNAL_SERVER_ERROR' && isProd()) {
      return {
        message: 'Oops! Something went wrong! :(',
        code: errorReport.code,
      };
    }
    return errorReport;
  },
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

run()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

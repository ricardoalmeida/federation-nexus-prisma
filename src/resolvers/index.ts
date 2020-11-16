import { Mutation } from './Mutations';
import { Query } from './Queries';
import * as Types from './types';

export const resolvers = {
  ...Types,
  Query,
  Mutation,
};

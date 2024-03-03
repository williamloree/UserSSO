import { Resolvers } from "./generated/graphql";

import {
  mutations as UsersMutations,
  queries as UsersQueries,
} from "./resolvers/UsersResolver";

export const resolvers: Resolvers = {
  Query: {
    ping: () => {
      return "pong !";
    },
    hello: (_, { name }) => `Hello ${name}!`,
    ...UsersQueries
  },
  Mutation: {
    ...UsersMutations,
  },
};

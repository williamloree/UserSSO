import { Context } from "./@types/graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

import { User } from "./entities/User";
import { getUserFromBearer } from "./helpers/Auth";
import { didEncounterErrorsExec, didResolveOperationExec } from "./plugins";

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  plugins: [
    {
      async requestDidStart() {
        return {
          async didEncounterErrors(context) {
            await didEncounterErrorsExec(context);
          },
          async didResolveOperation(context) {
            didResolveOperationExec(context);
          },
        };
      },
    },
  ],
});

export const start = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const authToken = req.headers["authorization"]?.replace("Bearer ", "");
      let currentUser: User | null = null;
      if (authToken) {
        currentUser = await getUserFromBearer(authToken);
      }
      return {
        authToken,
        currentUser,
      };
    },
  });
  console.log(`🚀 Server ready at ${url}`);
};

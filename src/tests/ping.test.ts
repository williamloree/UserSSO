import { ApolloServer } from "@apollo/server";
import assert from "assert";

import { typeDefs } from "../typeDefs";
import { resolvers } from "../resolvers";
import { Context } from "../@types/graphql";
import { ping } from "./gql/Ping";

let testServer: ApolloServer<Context>;

beforeAll(() => {
  testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
});

afterAll(async () => {
  await testServer?.stop();
});

describe("ping", () => {
  it("returns pong !", async () => {
    const response = await testServer.executeOperation({
      query: ping,
    });
    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.ping).toBe("pong !");
  });
});

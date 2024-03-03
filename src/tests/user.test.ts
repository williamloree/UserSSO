// import { ApolloServer } from "@apollo/server";
// import assert from "assert";

// import { typeDefs } from "../typeDefs";
// import { resolvers } from "../resolvers";
// import { Context } from "../@types/graphql";
// import AppDataSource from "../config/database";

// import { CreateUser } from "./gql/User";

// let testServer: ApolloServer<Context>;

// const user = {
//   email: "williamloree@hotmail.fr",
//   password: "qwertyuiop",
// };

// beforeAll(async () => {
//   testServer = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });
// });

// // afterAll(async () => {
// //   await testServer?.stop();
// // });

// describe("Test User", () => {
//   it("createUser", async () => {
//     AppDataSource.initialize();
//     const response = await testServer.executeOperation({
//       query: CreateUser,
//       variables: { input: user },
//     });
//     assert(response.body.kind === "single");
//     expect(response.body.singleResult.errors).toBeUndefined();
//     expect(response.body.singleResult.data?.createUser).toBe(user);
//   });
// });

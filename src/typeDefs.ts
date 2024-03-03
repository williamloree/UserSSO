import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type Query {
    me: Me
    hello(name: String): String!
    users: [User]
    ping: String
  }

  type Mutation {
    createUser(input: UserInput): User
    login(input: LoginInput): String
    updateUser(input: UpdateUserInput): User
    updatePassword(input: UpdatePasswordInput): Boolean
    delUser: Boolean
  }

  scalar Datetime

  type Me {
    id: Int!
    email: String!
    authToken: String
    createdAt: Datetime!
    updatedAt: Datetime!
  }

  type User {
    id: Int!
    email: String!
    authToken: String
    createdAt: Datetime!
    updatedAt: Datetime!
  }

  input LoginInput {
    email: String
    password: String
  }

  input UserInput {
    email: String
    password: String
  }

  input UpdateUserInput {
    email: String
  }
  
  input UpdatePasswordInput {
    password: String
    newPassword: String
  }
`;

import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    hello: String!
    cheese: String!
    users: [User!]!
  }

  type User {
    id: ID!
    profile_image: String!
    name: String!
    public_handle: String!
    email: String!
    followers: [ID]!
    following: [ID]!
    posts: [ID]!
  }

  type Mutation {
    createUser(profile_image: String!, name: String!, public_handle: String!, email: String!, followers: [ID!]!, following: [ID!]!, posts: [ID]!): User!
  }
`;

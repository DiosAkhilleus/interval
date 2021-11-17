import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    hello: String!
    cheese: String!
    users: [User!]!
    currentUser(email: String!): [User!]!
    getUserById(_id: String!): [User!]!
    posts: [PostWithEntities!]!
  }
  
  type User {
    id: ID!
    profile_image: String!
    name: String!
    public_handle: String!
    email: String!
    followers: [ID!]!
    following: [ID!]!
    posts: [ID!]!
  }

  type Entities {
    user_mentions: [String!]!
    tags: [String!]!
    urls: [String!]!
  }

  type PostWithEntities {
    id: ID!
    posted_at: String!
    posted_by: ID!
    repost_count: Int! 
    reposted: Boolean! 
    text: String!
    in_reply_to_public_handle: String!
    in_reply_to_user_id: String! 
    likes: Int! 
    dislikes: Int!
    entities: Entities!
  }

  type Post {
    id: ID!
    posted_at: String!
    posted_by: ID!
    repost_count: Int! 
    reposted: Boolean! 
    text: String!
    in_reply_to_public_handle: String!
    in_reply_to_user_id: String! 
    likes: Int! 
    dislikes: Int!
    user_mentions: [String!]!
    tags: [String!]!
    urls: [String!]!
  }

  type Mutation {
    createUser(profile_image: String!, name: String!, public_handle: String!, email: String!, followers: [ID!]!, following: [ID!]!, posts: [ID]!): User!

    createPost(posted_at: String!, posted_by: ID!, repost_count: Int!, reposted: Boolean!, text: String!, in_reply_to_public_handle: String!, in_reply_to_user_id: String!, likes: Int!, dislikes: Int!, user_mentions: [String!]!, tags: [String!]!, urls: [String!]! ): Post!
  }
`;
 
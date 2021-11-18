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
    liked_posts: [String!]!
    disliked_posts: [String!]!
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

  type UserVote {
    id: ID!
    type: String
    method: String
  }

  type VoteFields {
    user_id: String 
    post_id: String
    type: String
    method: String
  }

  type Mutation {
    createUser(profile_image: String!, name: String!, public_handle: String!, email: String!, followers: [ID!]!, following: [ID!]!, posts: [ID]!): User!

    createPost(posted_at: String!, posted_by: ID!, repost_count: Int!, reposted: Boolean!, text: String!, in_reply_to_public_handle: String!, in_reply_to_user_id: String!, likes: Int!, dislikes: Int!, user_mentions: [String!]!, tags: [String!]!, urls: [String!]! ): Post!

    changeName(name: String!, _id: String!): User!

    modifyPostWithVote(_id: String!, type: String, method: String): UserVote!

    modifyUserVoteFields(user_id: String!, post_id: String!, type: String!, method: String!): VoteFields!
  }
`;
 
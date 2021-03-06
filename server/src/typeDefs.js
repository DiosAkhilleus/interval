import { gql } from 'apollo-server-express';

// This file defines the type definition for GraphQL queries and mutations.

export const typeDefs = gql`
  type Query {
    hello: String!
    cheese: String!
    users: [User!]!
    currentUser(email: String!): [User!]!
    getUserByID(_id: String!): [User!]!
    getUserByHandleRegex(regex: String!): [User!]!
    posts: [PostWithEntities!]!
    getPostByID(_id: String!): [Post!]!
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
    reply: Boolean!
    title: String!
    text: String!
    in_reply_to_public_handle: String!
    in_reply_to_user_id: String!
    in_reply_to_post_id: String!
    replies: [String!]!
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
    reply: Boolean!
    title: String!
    text: String!
    in_reply_to_public_handle: String!
    in_reply_to_user_id: String!
    in_reply_to_post_id: String!
    replies: [String!]!
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
    createUser(
      profile_image: String!
      name: String!
      public_handle: String!
      email: String!
      followers: [ID!]!
      following: [ID!]!
      posts: [ID]!
    ): User!

    createPost(
      posted_at: String!
      posted_by: ID!
      repost_count: Int!
      reposted: Boolean!
      reply: Boolean!
      title: String
      text: String!
      in_reply_to_public_handle: String!
      in_reply_to_user_id: String!
      in_reply_to_post_id: String!
      replies: [String!]!
      likes: Int!
      dislikes: Int!
      user_mentions: [String!]!
      tags: [String!]!
      urls: [String!]!
    ): Post!

    addReplyID(original_post_id: String!, reply_id: String!): Post

    addReplyIDToUserPosts(user_id: String!, reply_id: String!): User

    addPostIDToUserPosts(user_id: String!, post_id: String!): User
    
    changeName(name: String!, _id: String!): User!

    changeHandle(public_handle: String!, _id: String!): User!

    changeProfileImage(profile_image: String!, _id: String!): User

    modifyPostWithVote(_id: String!, type: String, method: String): UserVote!

    completeUserFollowRequest(current_user_id: String!, target_user_id: String!): User
    
    completeUserUnfollowRequest(current_user_id: String!, target_user_id: String!): User

    modifyUserVoteFields(
      user_id: String!
      post_id: String!
      type: String!
      method: String!
    ): VoteFields!
  }
`;

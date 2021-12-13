import { gql } from '@apollo/client';

// GraphQL Apollo queries file

// Retrieves all users from the DB
export const GET_ALL_USERS = gql`
  query GetUsers {
    users {
      name
      email
      profile_image
    }
  }
`;

// Retrieves users by public_handle regex search... Used in the user search feature
export const GET_USER_WITH_REGEX = gql`
  query GetUserByHandleRegex ($regex: String!) {
    getUserByHandleRegex(regex: $regex) {
      name
      email
      public_handle
      id
      profile_image
    }
  }
`

// Retrieves the currently authenticated user by their email
export const GET_CURRENT_USER = gql`
  query CurrentUser ($email: String!) {
    currentUser(email: $email) {
      name
      email
      profile_image
      public_handle
      id
      posts
      following
    }
  }
`;

// Retrieves the posts that the currently authenticated user has either "liked" or "disliked"
export const GET_CURRENT_USER_VOTED_POSTS = gql`
  query CurrentUser ($email: String!) {
    currentUser(email: $email) {
      id
      liked_posts
      disliked_posts
    }
  }
`;

// Retrieves a user from the DB by ID
export const GET_USER_BY_ID = gql`
  query GetUserByID ($id: String!) {
    getUserByID(_id: $id) {
      name
      public_handle
      profile_image
    }
  }
`

// Retrieves the users that the currently authenticated user is following
export const GET_USER_FOLLOWING = gql`
  query GetUserByID ($id: String!) {
    getUserByID(_id: $id) {
      following
    }
  }
`

// Retrieves a user's profile information
export const GET_USER_PROFILE = gql`
  query GetUserByID ($id: String!) {
    getUserByID(_id: $id) {
      name
      public_handle
      profile_image
      posts
      followers
      following
    }
  }
`

// Retrieves all posts
export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      text
      title
      posted_by
      repost_count
      likes
      replies
      dislikes
      entities {
        tags
      }
    }
  }
`

// Retrieves a specific post by ID
export const GET_POST_BY_ID = gql`
  query GetPostByID ($id: String!) {
    getPostByID (_id: $id) {
      text
      title
      posted_by
      repost_count
      likes
      dislikes
      replies
      reply
      in_reply_to_user_id
      in_reply_to_post_id
    }
  }
`

// Retrieves a post's replies
export const GET_POST_REPLIES = gql`
  query GetPostByID($id: String!) {
    getPostByID (_id: $id) {
      replies
    }
  }
`

import { gql } from '@apollo/client';

// GraphQL Apollo queries file


export const GET_ALL_USERS = gql`
  query GetUsers {
    users {
      name
      email
      profile_image
    }
  }
`;

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

export const GET_CURRENT_USER = gql`
  query CurrentUser ($email: String!) {
    currentUser(email: $email) {
      name
      email
      profile_image
      public_handle
      id
    }
  }
`;

export const GET_CURRENT_USER_VOTED_POSTS = gql`
  query CurrentUser ($email: String!) {
    currentUser(email: $email) {
      id
      liked_posts
      disliked_posts
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById ($id: String!) {
    getUserById(_id: $id) {
      name
      public_handle
      profile_image
    }
  }
`

export const GET_USER_FOLLOWING = gql`
  query GetUserById ($id: String!) {
    getUserById(_id: $id) {
      following
    }
  }
`

export const GET_USER_PROFILE = gql`
  query GetUserById ($id: String!) {
    getUserById(_id: $id) {
      name
      public_handle
      profile_image
      posts
      followers
      following
    }
  }
`

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

export const GET_POST_BY_ID = gql`
  query GetPostById ($id: String!) {
    getPostById (_id: $id) {
      text
      title
      posted_by
      repost_count
      likes
      dislikes
      replies
    }
  }
`

export const GET_POST_REPLIES = gql`
  query GetPostById($id: String!) {
    getPostById (_id: $id) {
      replies
    }
  }
`

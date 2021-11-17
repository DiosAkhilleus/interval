import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query GetUsers {
    users {
      name
      email
      profile_image
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query CurrentUser ($email: String!) {
    currentUser(email: $email) {
      name
      email
      profile_image
      public_handle
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

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      text
      posted_by
      repost_count
      likes
      dislikes
      entities {
        tags
      }
    }
  }
`

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

import { gql } from '@apollo/client';

export const POST_USER = gql`
  mutation PostUser ($profile_image: String!, $name: String!, $public_handle: String!, $email: String! $followers: [ID!]!, $following: [ID!]!, $posts: [ID!]!) {
    createUser(profile_image: $profile_image, name: $name, public_handle: $public_handle, email: $email, followers: $followers, following: $following, posts: $posts) {
      profile_image
      name
      public_handle
      email
      followers
      following
      posts
    }
  }
`;

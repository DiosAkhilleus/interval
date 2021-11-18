import { gql } from '@apollo/client';


export const HANDLE_USER_VOTE = gql`
  mutation HandleUserVote(
    $id: String!
    $type: String!
    $method: String!
  ) {
    handleUserVote(_id: $id, type: $type, method: $method) {
      type
      method
    }
  }
`

export const CHANGE_DISPLAY_NAME = gql`
  mutation ChangeDisplayName(
    $name: String!
    $id: String!
    ) {
      changeName(name: $name, _id: $id) {
        name
    }
  }
`;

export const POST_USER = gql`
  mutation PostUser(
    $profile_image: String!
    $name: String!
    $public_handle: String!
    $email: String!
    $followers: [ID!]!
    $following: [ID!]!
    $posts: [ID!]!
  ) {
    createUser(
      profile_image: $profile_image
      name: $name
      public_handle: $public_handle
      email: $email
      followers: $followers
      following: $following
      posts: $posts
    ) {
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

export const CREATE_POST = gql`
  union StringOrNull = String | Null,
  mutation CreatePost ($posted_at: String!, $posted_by: ID!, $repost_count: Number!, $reposted: Boolean!, $text: String!, $in_reply_to_public_handle: String! , $in_reply_to_user_id: String!, $likes: Number!, $dislikes: Number!, $user_mentions: [String], $tags: [String], $urls: [String] ) {
    createPost(
      posted_at: $posted_at, 
      posted_by: $posted_by,
      repost_count: $repost_count,
      reposted: $reposted,
      text: $text,
      in_reply_to_public_handle: $in_reply_to_public_handle,
      likes: $likes,
      dislikes: $dislikes,
      user_mentions: $user_mentions
      tags: $tags
      urls: $urls
    ) {
      posted_at
      posted_by
      repost_count
      reposted
      text
      in_reply_to_public_handle
      likes
      dislikes
      user_mentions
      tags
      urls
    }
  }
`;

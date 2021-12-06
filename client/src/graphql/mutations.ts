import { gql } from '@apollo/client';

// GraphQL Apollo mutations file

export const MODIFY_USER_VOTE_FIELDS = gql`
  mutation ModifyUserVoteFields(
    $user_id: String!
    $post_id: String!
    $type: String!
    $method: String!
  ) {
    modifyUserVoteFields(
      user_id: $user_id
      post_id: $post_id
      type: $type
      method: $method
    ) {
      user_id
      post_id
      type
      method
    }
  }
`;

export const MODIFY_POST_WITH_VOTE = gql`
  mutation ModifyPostWithVote($id: String!, $type: String!, $method: String!) {
    modifyPostWithVote(_id: $id, type: $type, method: $method) {
      type
      method
    }
  }
`;

export const CHANGE_DISPLAY_NAME = gql`
  mutation ChangeDisplayName($name: String!, $id: String!) {
    changeName(name: $name, _id: $id) {
      name
    }
  }
`;

export const CHANGE_PUBLIC_HANDLE = gql`
  mutation ChangePublicHandle($public_handle: String!, $id: String!) {
    changeHandle(public_handle: $public_handle, _id: $id) {
      public_handle
    }
  }
`;

export const ADD_USER_ID_TO_FOLLOWING = gql`
  mutation AddUserIdToFollowing($current_user_id: String!, $followed_user_id: String!) {
    addUserIdToFollowing(current_user_id: $current_user_id, followed_user_id: $followed_user_id) {
      id
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

export const ADD_REPLY_ID_TO_POST = gql`
  mutation AddReplyID($original_post_id: String!, $reply_id: String!) {
    addReplyID(original_post_id: $original_post_id, reply_id: $reply_id) {
      replies
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost(
    $posted_at: String!
    $posted_by: ID!
    $repost_count: Int!
    $reposted: Boolean!
    $reply: Boolean!
    $title: String!
    $text: String!
    $in_reply_to_public_handle: String!
    $in_reply_to_user_id: String!
    $replies: [String!]!
    $likes: Int!
    $dislikes: Int!
    $user_mentions: [String!]!
    $tags: [String!]!
    $urls: [String!]!
  ) {
    createPost(
      posted_at: $posted_at
      posted_by: $posted_by
      repost_count: $repost_count
      reposted: $reposted
      reply: $reply
      title: $title
      text: $text
      in_reply_to_public_handle: $in_reply_to_public_handle
      in_reply_to_user_id: $in_reply_to_user_id
      replies: $replies
      likes: $likes
      dislikes: $dislikes
      user_mentions: $user_mentions
      tags: $tags
      urls: $urls
    ) {
      text
      id
    }
  }
`;

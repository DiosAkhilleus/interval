import { gql } from '@apollo/client';

// GraphQL Apollo mutations file


// Modifies the currently authenticated user's liked and disliked posts field depending on the action performed
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

// Modifies a post's likes or dislikes depending on the action performed by the currently authenticated user
export const MODIFY_POST_WITH_VOTE = gql`
  mutation ModifyPostWithVote($id: String!, $type: String!, $method: String!) {
    modifyPostWithVote(_id: $id, type: $type, method: $method) {
      type
      method
    }
  }
`;

// Changes the currently authenticated user's display name in the DB
export const CHANGE_DISPLAY_NAME = gql`
  mutation ChangeDisplayName($name: String!, $id: String!) {
    changeName(name: $name, _id: $id) {
      name
    }
  }
`;

// Changes the currently authenticated user's profile image link in the DB
export const CHANGE_PROFILE_IMAGE = gql`
  mutation ChangeProfileImage($profile_image: String!, $id: String!) {
    changeProfileImage(profile_image: $profile_image, _id: $id) {
      profile_image
    }
  }
`;

// Changes the currently authenticated user's public handle in the DB
export const CHANGE_PUBLIC_HANDLE = gql`
  mutation ChangePublicHandle($public_handle: String!, $id: String!) {
    changeHandle(public_handle: $public_handle, _id: $id) {
      public_handle
    }
  }
`;

// Completes a follow request between the currently authenticated user and the target user
export const COMPLETE_USER_FOLLOW_REQUEST = gql`
  mutation CompleteUserFollowRequest($current_user_id: String!, $target_user_id: String!) {
    completeUserFollowRequest(current_user_id: $current_user_id, target_user_id: $target_user_id) {
      id
    }
  }
`;

// Completes an unfollow request between the currently authenticated user and the target user
export const COMPLETE_USER_UNFOLLOW_REQUEST = gql`
  mutation CompleteUserUnfollowRequest($current_user_id: String!, $target_user_id: String!) {
    completeUserUnfollowRequest(current_user_id: $current_user_id, target_user_id: $target_user_id) {
      id
    }
  }
`;

// Posts a new user to the DB
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

// Adds a reply's ID to a post's "replies" field in the DB
export const ADD_REPLY_ID_TO_POST = gql`
  mutation AddReplyID($original_post_id: String!, $reply_id: String!) {
    addReplyID(original_post_id: $original_post_id, reply_id: $reply_id) {
      replies
    }
  }
`;

// Adds a reply's ID to a user's "posts" field in the DB
export const ADD_REPLY_ID_TO_USER_POSTS = gql`
  mutation AddReplyIDToUserPosts($user_id: String!, $reply_id: String!) {
    addReplyIDToUserPosts(user_id: $user_id, reply_id: $reply_id) {
      id
    }
  }
`

// Creates a new post in the DB
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
    $in_reply_to_post_id: String!
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
      in_reply_to_post_id: $in_reply_to_post_id
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

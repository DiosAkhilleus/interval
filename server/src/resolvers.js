import { User } from './models/User';
import { Post } from './models/Post';

export const resolvers = {
  Query: {
    hello: () => 'Hello World',
    cheese: () => 'Give to me Cheese',
    users: async () => await User.find(),
    currentUser: async (_, { email }) => await User.find({ email: email }),
    getUserById: async (_, { _id }) => await User.find({ _id: _id }),
    posts: async () => await Post.find(),
  },
  Mutation: {
    createUser: async (
      _,
      { profile_image, name, public_handle, email, followers, following, posts }
    ) => {
      const user = new User({
        profile_image: profile_image,
        name: name,
        public_handle: public_handle,
        email: email,
        followers: followers,
        following: following,
        posts: posts,
      });
      await user.save();
      return user;
    },
    createPost: async (
      _,
      {
        posted_at,
        posted_by,
        repost_count,
        reposted,
        text,
        in_reply_to_public_handle,
        in_reply_to_user_id,
        likes,
        dislikes,
        user_mentions,
        tags,
        urls,
      }
    ) => {
      const entities = {
        user_mentions: user_mentions,
        tags: tags,
        urls: urls,
      };
      const newPost = new Post({
        posted_at: posted_at,
        posted_by: posted_by,
        repost_count: repost_count,
        reposted: reposted,
        text: text,
        in_reply_to_public_handle: in_reply_to_public_handle,
        in_reply_to_user_id: in_reply_to_user_id,
        likes: likes,
        dislikes: dislikes,
        entities: entities,
      });
      await newPost.save();
      return newPost;
    },
    changeName: async (_, { _id, name }) => {
      const filter = { _id: _id };
      const update = { name: name };
      let user = await User.findOneAndUpdate(filter, update, {
        new: true,
      });
      return user;
    },
    handleUserVote: async (_, { _id, type, method }) => {
      let inc;
      let filter = { _id: _id };
      if (method === 'increment') {
        inc = 1;
      }
      if (method === 'decrement') {
        inc = -1;
      }

      const post = await Post.findOneAndUpdate(
        filter,
        { $inc: { [type]: inc } },
        { new: true },
      );
      return post;
    },
  },
};

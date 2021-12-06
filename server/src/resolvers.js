import { User } from './models/User';
import { Post } from './models/Post';

export const resolvers = {
  // GraphQL resolvers file
  Query: {
    // Resolvers for information retrieval
    hello: () => 'Hello World',
    cheese: () => 'Give to me Cheese',
    users: async () => await User.find(),
    currentUser: async (_, { email }) => await User.find({ email: email }),
    getUserById: async (_, { _id }) => await User.find({ _id: _id }),
    getUserByHandleRegex: async(_, { regex }) => await User.find({public_handle: { $regex: regex, $options: 'i' }}),
    posts: async () => await Post.find({ reply: false }),
    getPostById: async (_, { _id }) => Post.find({ _id: _id }),
  },
  Mutation: {
    // Resolvers for mutating database entries
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
        reply,
        title,
        text,
        in_reply_to_public_handle,
        in_reply_to_user_id,
        replies,
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
        reply: reply,
        title: title,
        text: text,
        in_reply_to_public_handle: in_reply_to_public_handle,
        in_reply_to_user_id: in_reply_to_user_id,
        replies: replies,
        likes: likes,
        dislikes: dislikes,
        entities: entities,
      });
      await newPost.save();
      return newPost;
    },
    addReplyID: async (_, { original_post_id, reply_id }) => {
      // console.log(original_post_id, reply_id);
      const originalPost = await Post.find({ _id: original_post_id });
      let newReplyList = [reply_id, ...originalPost[0].replies];
      const newPost = await Post.findOneAndUpdate(
        { _id: original_post_id },
        {
          replies: newReplyList,
        },
        {
          new: true,
        }
      );
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
    changeHandle: async (_, { _id, public_handle }) => {
      const filter = { _id: _id };
      const update = { public_handle: public_handle };
      let user = await User.findOneAndUpdate(filter, update, {
        new: true,
      });
      return user;
    },
    modifyPostWithVote: async (_, { _id, type, method }) => {
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
        { new: true }
      );
      return post;
    },
    modifyUserVoteFields: async (_, { user_id, post_id, type, method }) => {
      console.log(user_id, post_id, type, method);

      const filter = { _id: user_id };
      const user = await User.find(filter);
      let liked_posts = user[0].liked_posts;
      let disliked_posts = user[0].disliked_posts;
      console.log(liked_posts, disliked_posts);
      let replacementArr;

      if (type === 'liked_posts') {
        if (method === 'add') {
          replacementArr = [...liked_posts, post_id];
        }
        if (method === 'remove') {
          replacementArr = liked_posts.filter((post) => post !== post_id);
        }
      }
      if (type === 'disliked_posts') {
        if (method === 'add') {
          replacementArr = [...disliked_posts, post_id];
        }
        if (method === 'subtract') {
          replacementArr = disliked_posts.filter((post) => post !== post_id);
        }
      }
      const newUser = User.findOneAndUpdate(
        filter,
        { [type]: replacementArr },
        { new: true }
      );
      return newUser;
    },
  },
};

import { User } from './models/User';

export const resolvers = {
  Query: {
    hello: () => 'Hello World',
    cheese: () => 'Give to me Cheese',
    users: async () => await User.find(),
    currentUser: async (_, { email }) =>  await User.find({email: email})
  },
  Mutation: {
    createUser: async (_, { profile_image, name, public_handle, email, followers, following, posts }) => {
      const user = new User({
        profile_image: profile_image, 
        name: name,
        public_handle: public_handle, 
        email: email, 
        followers: followers,
        following: following, 
        posts: posts
      });
      await user.save();
      return user;
    }
  }
}
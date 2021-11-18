import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  profile_image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  public_handle: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  followers: {
    type: Array,
    required: true,
  },
  following: {
    type: Array,
    required: true,
  },
  posts: {
    type: Array,
    required: true,
  },
  time_of_last_post: {
    type: Date,
    required: false,
  },
  email_verified: {
    type: Boolean, 
    required: true
  }, 
  liked_posts: {
    type: Array,
    required: true
  },
  disliked_posts: {
    type: Array,
    required: true
  }
});

export const User = mongoose.model('Users', UserSchema);



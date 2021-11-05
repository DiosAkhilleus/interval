const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
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
});

const UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;

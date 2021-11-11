const mongoose = require('mongoose');

const EntitySchema = new mongoose.Schema({
  user_mentions: {
    type: Array,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  urls: {
    type: Array,
    required: true,
  },
});

const PostSchema = new mongoose.Schema({
  posted_at: {
    type: Date,
    required: true,
  },
  posted_by: {
    type: String,
    required: true,
  },
  post_id: {
    type: String,
    required: true,
  },
  repost_count: {
    type: Number,
    required: true,
  },
  reposted: {
    type: Boolean,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  in_reply_to_public_handle: {
    type: String || null,
    required: true,
  },
  in_reply_to_user_id: {
    type: String || null,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  dislikes: {
    type: Number,
    required: true,
  },
  entities: {
    type: EntitySchema,
    required: true,
  },
});


const PostModel = new mongoose.model('Posts', PostSchema);


module.exports = PostModel;
import mongoose from 'mongoose';

const EntitySchema = new mongoose.Schema({ // Schema for entity object within Post
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

const PostSchema = new mongoose.Schema({ // Schema for Post database entry
  posted_at: {
    type: String,
    required: true,
  },
  posted_by: {
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
  reply: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String, 
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  in_reply_to_public_handle: {
    type: String || null,
    required: false,
  },
  in_reply_to_user_id: {
    type: String || null,
    required: false,
  },
  replies: {
    type: Array, 
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


export const Post = mongoose.model('Posts', PostSchema);
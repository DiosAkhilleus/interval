const express = require('express');
const app = express();
const connectToDB = require('./db/conn');
const UserModel = require('./models/User');
const PostModel = require('./models/Post');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

connectToDB();

app.get('/', (req, res) => {
  res.end('Request fulfilled');
});


app.post('/users/post', async (req, res) => {
  const user = new UserModel({
    _id: '1952857d-67d9-45a8-b938-c35ad4c66519',
    profile_image: 'https://s.gravatar.com/avatar/c5aee30741780469d8b802522c6b550d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjs.png',
    name: 'John Schalke',
    public_handle: '@jschalke96',
    email: 'jschalke96@gmail.com',
    followers: [],
    following: [],
    posts: []
  });
  try {
    await user.save();
  } catch (err) {
    console.error(err);
  }
  res.writeHead(200, {'content-type': 'application/json'});
  res.end('Posted User');
})


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

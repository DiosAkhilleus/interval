import { useState, useEffect } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useMutation, useQuery } from '@apollo/client';
import { Input } from 'reactstrap';
import { Button } from 'react-bootstrap';
import { CREATE_POST } from '../graphql/mutations';
import { GET_CURRENT_USER } from '../graphql/queries';
import Loading from './PublicComponents/Loading';

interface Props {}

const CreatePost = (props: Props) => {
  // Placeholder create post component - will be updated in the future.
  const { isAuthenticated } = useAuth0();
  const { user } = useAuth0();
  const { email } = user!;

  const [postTitle, setPostTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [tagArr, setTagArr] = useState<string[]>([]);
  const [tagInputVal, setTagInputVal] = useState('');

  const currentUser = useQuery(GET_CURRENT_USER, {
    // Retrieves current user data from the db based on currently authenticated user
    variables: { email: email },
  });
  const [createPost, createPostData] = useMutation(CREATE_POST);

  if (!isAuthenticated) {
    return <div>Please Log In</div>;
  }

  const submitPost = () => {
    if (postTitle !== '' && postText !== '') {
      createPost({
        variables: {
          posted_at: new Date().toString(),
          posted_by: currentUser.data.currentUser[0].id,
          repost_count: 0,
          reposted: false,
          reply: false,
          title: postTitle,
          text: postText,
          in_reply_to_public_handle: '',
          in_reply_to_user_id: '',
          replies: [],
          likes: 0,
          dislikes: 0,
          user_mentions: [],
          tags: tagArr,
          urls: [],
        },
      }).then((results) => {
        if (results.data.createPost.title === postTitle) {
          window.location.reload();
        }
      });
    } else {
      alert ("Your post must have a title and text!");
    }
  };

  const handleAddTag = () => {
    let newTagArr = tagArr;
    newTagArr.push(tagInputVal);
    setTagArr(newTagArr);
    setTagInputVal('');
  };

  const handleRemoveTag = (ind: number) => {
    let newTagArr = tagArr.filter((el, index) => index !== ind);
    setTagArr(newTagArr);
  };

  return (
    <div className="home-page-container">
      <div className="create-post-card">
        <div style={{ fontSize: 30 }}>Title</div>
        <Input
          style={{ width: '70%', marginBottom: 20 }}
          type="text"
          placeholder="Something descriptive..."
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <div
          style={{
            fontSize: 30,
            width: '90%',
            textAlign: 'center',
            borderTop: '2px solid rgb(8, 42, 52)',
          }}
        >
          Post Text
        </div>
        <textarea
          style={{
            width: '70%',
            height: '275px',
            minHeight: '275px',
            resize: 'none',
            marginBottom: 30,
            verticalAlign: 'top',
          }}
          placeholder="Something amusing..."
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
        <div
          style={{
            fontSize: 30,
            width: '90%',
            textAlign: 'center',
            borderTop: '2px solid rgb(8, 42, 52)',
          }}
        >
          Add Tags
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Input
            style={{ width: '300px', marginRight: 10 }}
            placeholder="Type tag here..."
            value={tagInputVal}
            onChange={(e) => setTagInputVal(e.target.value)}
            maxLength={8}
          />
          <Button variant="outline-primary" onClick={() => handleAddTag()}>
            Add Tag
          </Button>
        </div>
        <div
          style={{
            margin: 15,
            width: '80%',
            minHeight: 45,
            height: 45,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            border: '1px solid grey',
            overflowX: 'scroll',
            overflowY: 'hidden',
            borderRadius: 4,
          }}
        >
          {tagArr.map((tag, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                padding: '2px 10px 2px 10px',
                marginTop: 6,
                marginLeft: 5,
                marginRight: 5,
                textAlign: 'center',
                backgroundColor: 'lightgrey',
                height: 30,
                borderRadius: 5,
              }}
            >
              <div style={{ marginRight: 10 }}>{tag}</div>
              <img
                style={{ cursor: 'pointer' }}
                src="https://img.icons8.com/material-outlined/24/000000/delete-sign.png"
                alt="close"
                onClick={() => {
                  handleRemoveTag(index);
                }}
              />
            </div>
          ))}
        </div>
        <Button
          style={{ marginBottom: 20 }}
          variant="primary"
          onClick={() => submitPost()}
        >
          Submit Post
        </Button>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(CreatePost, {
  onRedirecting: () => <Loading />,
});

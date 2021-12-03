import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Input } from 'reactstrap';
import { Button } from 'react-bootstrap';

interface Props {}

const CreatePost = (props: Props) => {
  // Placeholder create post component - will be updated in the future.
  const { isAuthenticated } = useAuth0();

  const [tagArr, setTagArr] = useState<string[]>([]);
  const [tagInputVal, setTagInputVal] = useState('');

  if (!isAuthenticated) {
    return <div>Please Log In</div>;
  }

  const submitPost = () => {};

  const handleAddTag = () => {
    let newTagArr = tagArr;
    console.log();
    newTagArr.push(tagInputVal);
    setTagArr(newTagArr);
    setTagInputVal('');
  };

  const handleRemoveTag = (ind: number) => {
    console.log(ind);
  };

  return (
    <div className="home-page-container">
      <div className="create-post-card">
        <div style={{ fontSize: 30 }}>Title</div>
        <Input
          style={{ width: '70%', marginBottom: 20 }}
          type="text"
          placeholder="Something descriptive..."
        />
        <div
          style={{
            fontSize: 34,
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
          />
          <Button variant="outline-primary" onClick={() => handleAddTag()}>
            Add Tag
          </Button>
        </div>
        <div
          style={{
            margin: 15,
            width: '80%',
            minHeight: 38,
            height: 38,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            border: '1px solid grey',
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
                marginTop: '3.5px',
                marginRight: 10,
                textAlign: 'center',
                backgroundColor: 'lightgrey',
                height: '80%',
                borderRadius: 5,
              }}
            >
              <div style={{ marginRight: 10 }}>{tag}</div>
              <div onClick={() => handleRemoveTag(index)}>X</div>
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

export default CreatePost;

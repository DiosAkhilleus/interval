import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../../graphql/queries';

interface Entities {
  tags: Array<string>
}
interface PostInterface {
  profile_image: string,
  posted_by: string,
  tags: any,
  text: Array<string>
  entities: Entities
}

interface Props {
  postInfo: PostInterface
}

const Post = ({ postInfo } :Props) => {
  const { isLoading } = useAuth0();
  const [image, setImage] = useState('');

  const {loading, error, data} = useQuery(GET_USER_BY_ID, {variables: {id: postInfo.posted_by}})
  // console.log(data);

  useEffect(() => {
    if (data) {
      setImage(data.getUserById[0].profile_image);
    }

  }, [data])
  
  return (
    // <div></div>
    <div className="post-container">
      <div className="post-creator-details">
        <div className="post-creator-name-grouping">
          {!isLoading ? (
            <img
              style={{height: '100%'}}
              src={image}
              alt="Profile"
              className="rounded-circle img-thumbnail"
            />
          ) : (
            ''
          )}
          <h3 style={{ marginBottom: 4, marginLeft: 10 }}>{ data ? data.getUserById[0].name : ''}</h3>
        </div>
        {/* <div className="post-interval-number">Interval #{interval} </div> */}
        <div className="post-creator-handle">{data ? data.getUserById[0].public_handle : ''}</div>
      </div>
      <div className="post-content-details">{postInfo.text}</div>
      <div className="post-content-tags">
        {postInfo.entities.tags.map((el: string, id: number) => (
          <div style={{ marginLeft: 10 }}>{el}</div>
        ))}
      </div>
    </div>
  );
};

export default Post;

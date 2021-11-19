import { useParams } from 'react-router-dom';

interface Props {
  
}

const ViewPost = (props: Props) => {

  const { postId }= useParams<{postId?: string}>();



  return (
    <div>
      { postId }
    </div>
  )
}

export default ViewPost

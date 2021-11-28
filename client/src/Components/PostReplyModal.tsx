import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

type ModifyShowModal = () => void;

interface Props {
  show: boolean;
  onHide: ModifyShowModal;
  postTitle: string;
}

const PostReplyModal = (props: Props) => {

  const [replyText, setReplyText] = useState('');

  const handlePostReply = () => {
    console.log(replyText);
    props.onHide();
  }


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.postTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Create Your Reply</h4>
        <div style={{ height: 300 }}>
          <textarea
            style={{
              width: '100%',
              height: '80%',
              maxHeight: '80%',
              resize: 'none',
              margin: 'auto',
              marginBottom: 15,
              verticalAlign: 'top',
            }}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Something witty..."
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
        <Button variant="primary" onClick={handlePostReply}>Post Reply</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostReplyModal;

import Axios from 'axios';

export const postUser = () => {
  Axios.post('http://localhost:3001/users/post', {}).then(() =>
    alert('User Posted')
  );
};

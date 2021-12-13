import React from 'react';
import loading from '../../assets/loading.svg';
import '../../App.css';

interface Props {}

const Loading = (props: Props) => (
  // This is the "loading" component. It's a loading spinner that appears during auth checks.
  <div className="spinner">
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading;

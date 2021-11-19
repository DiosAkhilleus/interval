import React from 'react';
import loading from '../../assets/loading.svg';
import '../../App.css';

interface Props {}

const Loading = (props: Props) => (
  <div className="spinner">
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading;

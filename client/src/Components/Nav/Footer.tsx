import React from 'react';

interface Props {}

const Footer = (props: Props) => {
  return (
    <footer className="bg-light p-3 text-center fixed-bottom">
      <div className="logo" />
      <p>
        Interval, by <a href="diosakhilleus.github.io">DiosAkhilleus</a>
      </p>
    </footer>
  );
};

export default Footer;

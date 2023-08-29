import React from 'react';

const Protected = ({ session, children }) => {
  return <div>{session?.user ? children : <span>Please sign in.</span>}</div>;
};

export default Protected;

import React from 'react';
import SignInWithGoogle from './SignInWithGoogle';
import Heading from './Heading';

const Protected = ({ session, children }) => {
  return (
    <div>
      {session?.user ? (
        children
      ) : (
        <div className="grid gap-8 justify-items-start">
          <Heading>You're not signed in.</Heading>

          <SignInWithGoogle />
        </div>
      )}
    </div>
  );
};

export default Protected;

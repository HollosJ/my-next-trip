import React from 'react';

const loading = () => {
  return (
    <div className="container flex items-center justify-center md:max-w-screen-md">
      {/* Spinner */}
      <div className="w-16 h-16 border-2 rounded-full border-x-transparent animate-spin"></div>
    </div>
  );
};

export default loading;

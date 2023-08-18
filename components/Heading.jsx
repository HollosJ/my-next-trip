import React from 'react';

const Heading = ({ tag = 'h2', text = 'A Heading', children }) => {
  const CustomTag = `h${tag}`;

  return (
    <CustomTag className="text-2xl md:text-4xl font-bold">{children}</CustomTag>
  );
};

export default Heading;

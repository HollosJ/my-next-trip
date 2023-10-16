const Heading = ({ tag = 'h2', children }) => {
  const CustomTag = `${tag}`;

  return (
    <CustomTag className="text-2xl font-bold md:text-4xl">{children}</CustomTag>
  );
};

export default Heading;

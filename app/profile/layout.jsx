import Nav from "@components/Nav";

const layout = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default layout;

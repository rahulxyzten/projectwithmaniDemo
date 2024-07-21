import Nav from "@components/Nav";
import Feed from "@components/Feed";

const Home = () => {
  return (
    <>
      <Nav />
      <section className="w-full mt-16 flex-center flex-col">
        <Feed />
      </section>
    </>
  );
};

export default Home;

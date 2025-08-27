import Head from "next/head";
import type { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="viewport" content="width=750px" />
      </Head>
    </>
  );
};

export default Home;
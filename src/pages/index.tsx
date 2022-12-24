import { type NextPage } from "next";
import Head from "next/head";
import { FloatingMenu } from "../components/NavMenu/FloatingMenu";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Timesheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
        <FloatingMenu />
        {/* <FloatingUser /> */}
        <h1>Hello</h1>
      </main>
    </>
  );
};

export default Home;

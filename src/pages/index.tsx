import { type NextPage } from "next";
import { AccountMenu } from "../components/NavMenu/AccountMenu";
import { FloatingMenu } from "../components/NavMenu/FloatingMenu";

const Home: NextPage = () => {
  return (
    <>
      <main className="relative flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
        <FloatingMenu />
        <AccountMenu />
        <h1>Hello</h1>
      </main>
    </>
  );
};

export default Home;

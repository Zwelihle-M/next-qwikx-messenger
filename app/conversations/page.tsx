"use client";

import clsx from "clsx";
import useConversation from "../hooks/useConversation";
import EmptyScreen from "../components/EmptyScreen";

const Home = () => {
  const { isOpen } = useConversation();

  return (
    <>
      <div
        className={clsx(
          "lg:pl-80 h-full lg:block",
          isOpen ? "block" : "hidden"
        )}
      >
        <EmptyScreen/>
      </div>
    </>
  );
};

export default Home;

import React from "react";
import QwikxLogo from "../../public/images/qwikx-message-white.png";
import Image from "next/image";

const EmptyScreen = () => {
  return (
    <div className="px-4 py-10 sm-px-6 lg:px-8 h-full flex justify-center items-center bg-graySeven">
      <div className="text-center items-center flex flex-col">
        <Image
          src={QwikxLogo}
          alt="Logo"
          height={350}
          width={350}
          className="mx-auto w-auto"
          quality={100}
          priority
        />
        <h2 className="mt-2 text-4xl text-white">
          Select a chat or start a new converstation
        </h2>
      </div>
    </div>
  );
};

export default EmptyScreen;

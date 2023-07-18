"use client";

import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./ImageModal";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  // own messge or from another person
  const isOwn = session?.data?.user?.email === data?.sender?.email;
  // seen list
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(",");

  // classes
  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
  // avatar
  const avatar = clsx(isOwn && "order-2");
  // body class
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  // message class
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-primaryPurple text-white" : "bg-white text-black",
    data.image ? "rounded-md p-0" : "rounded-md py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>

      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>

        <div className={message}>
          <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data.image ? (
            <Image
              alt="Image"
              height={288}
              width={288}
              src={data.image}
              className="object-cover cursor-pointer hover:scale-110 transition translate"
              onClick={() => setImageModalOpen(true)}
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>

        {/*showing the user has seen the message  */}

        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500">
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;

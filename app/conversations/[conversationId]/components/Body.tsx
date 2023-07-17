// "use client";

// import useConversation from "@/app/hooks/useConversation";
// import { FullMessageType } from "@/app/types";
// import { useEffect, useRef, useState } from "react";
// import MessageBox from "./MessageBox";
// import axios from "axios";
// import { pusherClient } from "@/app/libs/pusher";
// import { find } from "lodash";

// interface BodyProps {
//   initialMessages: FullMessageType[];
// }

// const Body: React.FC<BodyProps> = ({ initialMessages }) => {
//   const [messages, setMessages] = useState(initialMessages);
//   const bottomRef = useRef<HTMLDivElement>(null);

//   // extract conversation id
//   const { conversationId } = useConversation();

//   useEffect(() => {
//     axios.post(`/api/conversations/${conversationId}/seen`);
//   }, [conversationId]);
//   // pusher real time functionality
//   useEffect(() => {
//     pusherClient.subscribe(conversationId);
//     // scrolls to the latest message
//     bottomRef?.current?.scrollIntoView();

//     // messageHandler function that recieves new messages
//     const messageHandler = (message: FullMessageType) => {
//       axios.post(`/api/conversations/${conversationId}/seen`);
//       setMessages((current) => {
//         if (find(current, { id: message.id })) {
//           return current;
//         }

//         return [...current, message];
//       });

//       // scrolls to the latest message
//       bottomRef?.current?.scrollIntoView();
//     };

//     const updateMessageHandler = (newMessage: FullMessageType) => {
//       setMessages((current) =>
//         current.map((currentMessage) => {
//           if (currentMessage.id === newMessage.id) {
//             return newMessage;
//           }

//           return currentMessage;
//         })
//       );
//     };
//     // binding pusher client to key "messages"
//     pusherClient.bind("messages:new ", messageHandler);
//     pusherClient.bind("message:update", updateMessageHandler);
//     // unmouting pusher client
//     return () => {
//       pusherClient.unsubscribe(conversationId);
//       pusherClient.unbind("messages:new", messageHandler);
//       pusherClient.unbind("message:update", updateMessageHandler);
//     };
//   }, [conversationId]);
//   return (
//     <div className="flex-1 overflow-y-auto bg-graySeven">
//       {messages.map((message, i) => (
//         <MessageBox
//           isLast={i === messages.length - 1}
//           key={message.id}
//           data={message}
//         />
//       ))}
//       <div ref={bottomRef} className="pt-24" />
//     </div>
//   );
// };

// export default Body;

'use client';

import axios from "axios";
import { useEffect, useRef, useState } from "react";

import { pusherClient } from "@/app/libs/pusher";
import useConversation from "@/app/hooks/useConversation";
import MessageBox from "./MessageBox";
import { FullMessageType } from "@/app/types";
import { find } from "lodash";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages = [] }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);
  
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId)
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message]
      });
      
      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) => current.map((currentMessage) => {
        if (currentMessage.id === newMessage.id) {
          return newMessage;
        }
  
        return currentMessage;
      }))
    };
  

    pusherClient.bind('messages:new', messageHandler)
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new', messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
  }, [conversationId]);

  return ( 
    <div className="flex-1 overflow-y-auto bg-graySeven">
      {messages.map((message, i) => (
        <MessageBox 
          isLast={i === messages.length - 1} 
          key={message.id} 
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
}
 
export default Body;

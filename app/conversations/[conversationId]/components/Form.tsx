"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

//   handle the upload functionality

const handleUpload= (result: any) =>{
    axios.post("/api/messages", {
        image: result?.info?.secure_url,
        conversationId
    })

}
  return (
    <div className="py-4 px-4 bg-graySeven border-t flex items-center gap-2 lg:gap-4 w-full text-white ">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="l3u7rhld"
      >
        <span className="text-primaryPurple">
          <HiPhoto size={30} />
        </span>
      </CldUploadButton>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="rounded-full p-2 bg-primaryPurple cursor-pointer hover:bg-primaryViolet transition"
        >
          <span className="text-white">
            <HiPaperAirplane size={18} />
          </span>
        </button>
      </form>
    </div>
  );
};

export default Form;

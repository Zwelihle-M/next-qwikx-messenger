import Image from "next/image";
import QwikxLogo from "../../public/images/qwikx-message-white.png";
import AuthenticationForm from "./components/AuthenticationForm";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-graySeven">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* qwikx logo */}
        <Image
          src={QwikxLogo}
          alt="Logo"
          height={100}
          width={200}
          className="mx-auto w-auto"
          quality={100}
          priority
        />
        <h1 className="mt-6 text-center text-3xl tracking-tight text-white font-thin">
          Sign in to your account
        </h1>
      </div>
      {/* authenticationForm */}
      <AuthenticationForm />
    </div>
  );
}

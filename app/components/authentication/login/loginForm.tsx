"use client";
import { MouseEvent } from "react";
import Button from "../../button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import googleIcon from "@/app/assets/googleLogo.png";

const LoginForm = () => {
  const handleGoogleLogin = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signIn("google", { callbackUrl: "/home" });
  };
  return (
    <form className="flex flex-col justify-center items-center">
      <Button type="button" onClick={handleGoogleLogin}>
        <div className="flex items-center">
          <Image src={googleIcon} alt="google icon" width={16} height={16} />
          <span className="ml-2">Sign in with Google</span>
        </div>
      </Button>
    </form>
  );
};

export default LoginForm;

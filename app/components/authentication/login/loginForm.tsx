"use client";
import { MouseEvent } from "react";
import Button from "../../button";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const handleGoogleLogin = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signIn("google", { callbackUrl: "/home" });
  };
  return (
    <form className="flex flex-col justify-center items-center">
      <Button type="button" onClick={handleGoogleLogin}>
        Entrar com o Google
      </Button>
    </form>
  );
};

export default LoginForm;

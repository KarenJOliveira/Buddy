"use client";

import { useState } from "react";
import Button from "../../button";
import LoginForm from "./loginForm";

const LoginContainer = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Buddy</h1>
        <p className="text-gray-600 text-sm">
          Sua plataforma de gerenciamento de cuidados de animais de estimação
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="p-8">
          <div className="max-w-sm mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {isSignUp ? "Cadastro" : "Login"}
            </h2>

            <div className="overflow-y-auto">
              <div
                className={`transition-all duration-500 ease-in-out transform ${
                  isSignUp
                    ? "-translate-x-full opacity-0"
                    : "translate-x-0 opacity-100"
                } ${!isSignUp ? "block" : "hidden"}`}
              >
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;

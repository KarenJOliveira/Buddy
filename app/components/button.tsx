"use client";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "edit" | "softDange";
}

const Button = ({
  variant = "primary",
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "px-4 py-2 gap-2 rounded focus:outline-none cursor-pointer transition-colors duration-200 flex items-center";
  const variantClasses = {
    primary: `bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500`,
    secondary: `bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500`,
    danger: `bg-red-500 text-white hover:bg-red-600 focus:ring-red-500`,
    edit: `bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200`,
    softDange: `bg-red-50 text-red-700 hover:bg-red-100 border border-red-200`,
  };
  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${
        disabled && disabledClasses
      }`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

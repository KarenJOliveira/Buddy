"use client";

import { useRef, useEffect, useState, MouseEvent, useTransition } from "react";
import { Route } from "../types/route";
import Link from "next/link";
import {
  MenuIcon,
  XIcon,
  LogOutIcon,
  HourglassIcon,
  LogInIcon,
} from "lucide-react";
import Image from "next/image";
import logo from "../assets/logo.png";
import { signOut, useSession } from "next-auth/react";

interface MenuProps {
  routes?: Route[];
}

const Menu = ({ routes }: MenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const onClose = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = (e: MouseEvent) => {
    e.preventDefault();
    onClose();
    startTransition(() => {
      signOut({ callbackUrl: "/inicio" });
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-orange-500 text-white p-2 z-50">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-1 hover:text-gray-300"
        >
          <MenuIcon size={24} />
        </button>
      </div>
      <div className="fixed top-0 left-16 z-50">
        <Image src={logo} alt="Logo" width={96} height={32} />
      </div>
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XIcon />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {routes?.map((route, index) => (
            <Link
              href={route.href}
              key={index}
              className="block text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-colors duration-200 px-4 py-2"
              onClick={onClose}
            >
              <p>{route.label}</p>
            </Link>
          ))}
          <div className="mt-auto pt-4 border-t">
            {isAuthenticated ? (
              <button
                className="w-full text-left block text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-colors duration-200 px-4 py-2"
                onClick={handleLogout}
              >
                {isPending ? (
                  <div className="flex items-center">
                    <HourglassIcon className="mr-2" />
                    Aguarde...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogOutIcon className="mr-2" />
                    Logout
                  </div>
                )}
              </button>
            ) : (
              <Link
                href="/login"
                className="block text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-colors duration-200 px-4 py-2"
                onClick={onClose}
              >
                <div className="flex items-center">
                  <LogInIcon className="mr-2" />
                  Login
                </div>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Menu;

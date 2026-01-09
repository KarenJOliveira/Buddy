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
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import logo from "../assets/logo.png";
import { signOut, useSession } from "next-auth/react";

interface MenuProps {
  routes: Route[];
  showRoutes?: boolean;
}

const Menu = ({ routes, showRoutes = false }: MenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const [isPending, startTransition] = useTransition();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const onClose = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = (e: MouseEvent) => {
    e.preventDefault();
    setIsProfileDropdownOpen(false);
    onClose();
    startTransition(() => {
      signOut({ callbackUrl: "/" });
    });
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isMenuOpen || isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, isProfileDropdownOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-orange-500 text-white p-2 z-50">
      <ul className="flex items-center max-w-(--max-layout) mx-auto">
        <li className="flex items-center gap-4 px-6 mr-auto">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-1 hover:text-gray-300"
          >
            <MenuIcon size={24} />
          </button>
          <Link href="/">
            <Image src={logo} alt="Logo" width={96} height={32} />
          </Link>
        </li>

        {showRoutes && (
          <div className="hidden md:flex items-center">
            {routes.map((route, idx) => (
              <li key={idx} className="px-6">
                <Link href={route.href}>
                  <span>{route.label}</span>
                </Link>
              </li>
            ))}
          </div>
        )}

        {isAuthenticated ? (
          <li className="px-6 relative" ref={dropdownRef}>
            <button
              onClick={toggleProfileDropdown}
              className="flex items-center justify-center"
              title="Perfil do Usuário"
            >
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt="Foto do perfil do usuário"
                  width={32}
                  height={32}
                  className="rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                />
              ) : (
                <div className="relative">
                  <UserIcon
                    size={32}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </div>
              )}
            </button>

            {/* trying to match the retractable bar style here */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  href={`/user/${session.user.id}`}
                  className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  <div className="flex items-center">
                    <UserIcon className="mr-2" size={18} />
                    Perfil
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 cursor-pointer"
                >
                  {isPending ? (
                    <div className="flex items-center">
                      <HourglassIcon className="mr-2" size={18} />
                      Aguarde...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <LogOutIcon className="mr-2" size={18} />
                      Logout
                    </div>
                  )}
                </button>
              </div>
            )}
          </li>
        ) : (
          <li className="px-6">
            <Link href="/login" onClick={onClose}>
              <div className="flex items-center">
                <LogInIcon className="mr-2" />
                Login
              </div>
            </Link>
          </li>
        )}
      </ul>

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
    </nav>
  );
};

export default Menu;

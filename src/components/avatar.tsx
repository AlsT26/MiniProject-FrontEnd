"use client";

import { useSession } from "@/context/useSession";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export const Avatar = () => {
  const router = useRouter();
  const { user, isAuth, setIsAuth } = useSession();
  const [dropdownOpenAvatar, setDropdownOpenAvatar] = useState(false);
  const [dropdownOpenLogin, setDropdownOpenLogin] = useState(false);
  const [dropdownOpenRegister, setDropdownOpenRegister] = useState(false);
  const [role, setRole] = useState<"Promotor" | "User" | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token === null) return;

    if (!token) {
      router.push("/login");
    } else {
      const decodedUser = jwtDecode(token) as { role: "Promotor" | "User" };

      setRole(decodedUser.role);
    }
  }, [router, token]);

  const onLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    router.push("/login");
    router.refresh();
  };

  const toggleDropdownAvatar = () => {
    setDropdownOpenAvatar(!dropdownOpenAvatar);
  };
  const toggleDropdownLogin = () => {
    setDropdownOpenLogin(!dropdownOpenLogin);
    setDropdownOpenRegister(false);
  };
  const toggleDropdownRegister = () => {
    setDropdownOpenRegister(!dropdownOpenRegister);
    setDropdownOpenLogin(false);
  };

  return (
    <>
      {isAuth ? (
        <div className="relative">
          <div onClick={toggleDropdownAvatar} className="flex items-center cursor-pointer">
            <div className="w-[2rem] h-[2rem] relative">
              <Image className="rounded-full object-cover" src={user?.avatar || "https://res.cloudinary.com/dn6uglajh/image/upload/v1733990935/blank-image_yfczs3.jpg"} alt="Avatar" fill priority />
            </div>
            <div className="flex-1 min-w-0 ms-4">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{user?.username}</p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">{user?.email}</p>
            </div>
          </div>
          {dropdownOpenAvatar && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
              {role === "User" && (
                <div>
                  <button onClick={() => router.push("/profile")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left hover:rounded-lg">
                    Profile
                  </button>
                  <button onClick={() => router.push("/settings")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Settings
                  </button>
                </div>
              )}
              {role === "Promotor" && (
                <button onClick={() => router.push("/promotor/dashboard")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left hover:rounded-lg">
                  Dashboard
                </button>
              )}
              <button onClick={onLogout} className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left hover:rounded-lg">
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-2 relative">
          <button onClick={toggleDropdownRegister} className="inline-flex items-center border px-3 py-2 text-sm font-medium text-center text-black bg-white rounded-lg hover:bg-gray-100 ">
            Register
          </button>
          {dropdownOpenRegister && (
            <div className="absolute right-0 mt-[3rem] w-48 bg-white rounded-lg shadow-lg z-10">
              <button onClick={() => router.push("/register")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                Register as User
              </button>
              <button onClick={() => router.push("/promotor/register")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                Register as Promotor
              </button>
            </div>
          )}
          <button onClick={toggleDropdownLogin} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-orange-800 ">
            Login
          </button>
          {dropdownOpenLogin && (
            <div className="absolute right-0 mt-[3rem] w-48 bg-white rounded-lg shadow-lg z-10">
              <button onClick={() => router.push("/login")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                Login as User
              </button>
              <button onClick={() => router.push("/promotor/login")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                Login as Promotor
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

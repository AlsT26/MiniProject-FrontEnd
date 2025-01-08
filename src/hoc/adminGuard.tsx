"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface DecodedToken {
  role: "Promotor" | "User" | string;
}

// Add a `requiredRoles` parameter
const adminGuard = <P extends object>(WrappedComponent: React.ComponentType<P>, requiredRoles: string[]) => {
  const AdminGuard: React.FC<P> = (props) => {
    const router = useRouter();
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
        if (decodedUser.role !== "Promotor") {
          router.push("/");
        }
      }
    }, [router, token]);

    if (token === null) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AdminGuard;
};

export default adminGuard;

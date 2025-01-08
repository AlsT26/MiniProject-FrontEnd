"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VerifyPage({ params }: { params: { token: string } }) {
  const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;
  const router = useRouter();
  const onVerify = async () => {
    try {
      const res = await fetch(
        `${base_url}/auth/promotor/verify/${params.token}`,
        {
          method: "PATCH",
        }
      );
      const result = await res.json();
      if (!res.ok) throw result;
      router.push("/promotor/login");
    } catch (err) {
      console.log(err);
      router.push("/");
    }
  };

  useEffect(() => {
    onVerify();
  }, []);

  return (
    <div className="flex justify-center min-h-screen items-center">

    </div>
  );
}
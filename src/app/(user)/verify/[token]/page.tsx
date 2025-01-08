"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { toast } from "react-toastify";

export default function VerifyPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;
  const onVerify = async () => {
    try {
      const res = await fetch(
        `${base_url}/auth/verify/${params.token}`,
        {
          method: "PATCH",
        }
      );
      const result = await res.json();
      if (!res.ok) throw result;
    //   toast.success(result.message);
      router.push("/login");
    } catch (err) {
      console.log(err);
    //   toast.error(err.message);
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
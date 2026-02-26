"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/pages/login"); // client-side redirect
  }, [router]);

  return null; // nothing rendered
}
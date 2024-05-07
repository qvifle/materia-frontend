"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Page = () => {
  const { data: session } = useSession();
  console.log("session");

  useEffect(() => {
    console.log(session);
  }, [session]);

  return <div>Hello</div>;
};

export default Page;

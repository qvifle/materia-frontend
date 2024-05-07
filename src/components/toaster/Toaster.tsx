"use client";
import { useTheme } from "next-themes";
import React from "react";
import { Toaster } from "react-hot-toast";

const MyToaster = () => {
  const { theme } = useTheme();
  return (
    <Toaster
      toastOptions={{
        className: "bg-red-500",
        style: {
          backgroundColor: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
        },
      }}
      position="top-right"
    />
  );
};

export default MyToaster;

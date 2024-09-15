"use client";
import React from "react";
import { Toaster } from "react-hot-toast";

const MyToaster = () => {
  return (
    <Toaster
      toastOptions={{
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

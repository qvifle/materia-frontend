"use client";
import React, { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname().split("/");
  const isLight = pathName.includes("login");
  const isDark = pathName.includes("registration");

  const getTheme = () => {
    if (isLight) {
      return "light";
    } else if (isDark) {
      return "dark";
    } else {
      return undefined;
    }
  };

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          forcedTheme={getTheme()}
          defaultTheme="light"
        >
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;

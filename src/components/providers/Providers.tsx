"use client";
import React, { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;

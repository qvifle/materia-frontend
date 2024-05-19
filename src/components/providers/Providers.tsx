"use client";
import React, { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReorderTasksContextProvider from "@/context/ReorderTasksContextProvider";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <ReorderTasksContextProvider>
            <ThemeProvider attribute="class" defaultTheme="system">
              {children}
            </ThemeProvider>
          </ReorderTasksContextProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};

export default Providers;

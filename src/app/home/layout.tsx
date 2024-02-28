"use client";
import React, { ReactNode, useEffect, useState } from "react";
import styles from "./layout.module.css";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { ArrowRightCircle } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useSession } from "next-auth/react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { setTheme, theme } = useTheme();
  const [isOpen, setOpen] = useState(true);
  const session = useSession();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      return;
    }
    setTheme("light");
  };
  

  return (
    <div
      className={cn(
        styles.layout,
        isOpen ? styles.layoutOpen : styles.layoutClosed
      )}>
      <Sidebar isOpen={isOpen} setOpen={setOpen} />
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;

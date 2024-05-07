"use client";
import React, { ReactNode, useState } from "react";
import styles from "./layout.module.css";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isOpen, setOpen] = useState(true);

  return (
    <div
      className={cn(
        "bg-[url('/loginImage.png')]",
        styles.layout,
        isOpen ? styles.layoutOpen : styles.layoutClosed
      )}>
      <Sidebar isOpen={isOpen} setOpen={setOpen} />
      <Header />
      <main className={cn(styles.main)}>{children}</main>
    </div>
  );
};

export default Layout;

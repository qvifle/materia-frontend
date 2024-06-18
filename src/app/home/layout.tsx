// import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import React, { ReactNode, useState } from "react";
import styles from "@/styles/layout.module.css";
import { cn } from "@nextui-org/react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <Sidebar />
      <main className={styles.main}>
        <Breadcrumbs />
        {children}
      </main>
    </div>
  );
};

export default Layout;

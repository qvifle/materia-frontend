import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import React, { ReactNode, useState } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div
    // className={cn(
    //   styles.layout,
    //   isOpen ? styles.layoutOpen : styles.layoutClosed,
    // )}
    >
      {/* <Sidebar isOpen={isOpen} setOpen={setOpen} /> */}
      {/* <Header /> */}
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;

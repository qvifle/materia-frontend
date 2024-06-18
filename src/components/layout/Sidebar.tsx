import { cn } from "@nextui-org/react";
import React from "react";
import styles from "@/styles/layout.module.css";

const Sidebar = () => {
  return (
    <aside
      className={cn(
        styles.sidebar,
        "w-full hidden sm:block border-r border-gray-4",
      )}
    >
      Sidebar
    </aside>
  );
};

export default Sidebar;

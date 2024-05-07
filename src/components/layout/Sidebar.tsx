import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";
import SidebarProjects from "./SidebarProjects";

interface ISidebar {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<ISidebar> = ({ isOpen, setOpen }) => {
  return (
    <aside
      className={cn(
        "bg-background col-span-1 row-start-1 row-end-3 flex  flex-col",
      )}
    >
      <div className="flex items-center justify-between p-[15px] border-b border-b-border h-[70px]">
        <Link href={"/home"}>
          <h1
            className={cn(
              "scroll-m-20 text-4xl font-semibold tracking-tight lg:text-4xl w-max transition-all duration-100 delay-200",
              isOpen ? "opacity-100" : " hidden opacity-0",
            )}
          >
            Trello
          </h1>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setOpen((state) => !state);
          }}
        >
          <ArrowRightCircle
            className="duration-200 delay-300"
            style={{ rotate: `${isOpen ? "180deg" : ""}` }}
          />
        </Button>
      </div>

      <SidebarProjects isOpen={isOpen} />
    </aside>
  );
};

export default Sidebar;

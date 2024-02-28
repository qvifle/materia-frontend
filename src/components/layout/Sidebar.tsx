import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRightCircle, PlusCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import Image from "next/image";

interface ISidebar {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Mock = [
  {
    categoryTitle: "Му projects",
    projects: [
      {
        icon: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4b8.png",
        title: "Economics Website",
      },
      {
        icon: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4b8.png",
        title: "Hexcel",
      },
    ],
  },
];

const Sidebar: React.FC<ISidebar> = ({ isOpen, setOpen }) => {
  return (
    <aside
      className={cn(
        "bg-background col-span-1 row-start-1 row-end-3 flex  flex-col"
      )}>
      <div className="flex items-center justify-between p-[15px] border-b border-b-border h-[70px]">
        <h1
          className={cn(
            "scroll-m-20 text-4xl font-semibold tracking-tight lg:text-4xl w-max transition-all duration-100 delay-200",
            isOpen ? "opacity-100" : " hidden opacity-0"
          )}>
          Home
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setOpen((state) => !state);
          }}>
          <ArrowRightCircle
            className="duration-200 delay-300"
            style={{ rotate: `${isOpen ? "180deg" : ""}` }}
          />
        </Button>
      </div>
      {Mock.map((el, index) => {
        return (
          <div key={index} className="flex flex-col p-[15px] h-full">
            <div
              className={cn(
                "flex flex-col mb-2",
                isOpen ? "" : "items-center"
              )}>
              <div
                className={cn(
                  "flex items-center justify-between",
                  isOpen ? "mr-2" : ""
                )}>
                <p
                  className={cn(
                    "text-sm text-muted-foreground",
                    isOpen ? "block" : "hidden"
                  )}>
                  {el.categoryTitle}
                </p>
                <Button variant="ghost" size="icon" className="h-min w-min p-1">
                  <PlusCircle size={16} />
                </Button>
              </div>
            </div>
            <div>
              {el.projects.map((project, key) => {
                return (
                  <Button
                    key={key}
                    variant="ghost"
                    size={isOpen ? "default" : "icon"}
                    className={cn(
                      "w-full",
                      isOpen ? "justify-start" : "justify-center"
                    )}
                    asChild>
                    <Link href="#" className="text-left">
                      <div className="flex items-center gap-2">
                        <Image
                          alt="project-icon"
                          src={project.icon}
                          width={20}
                          height={20}
                        />
                        {isOpen ? <span>{project.title}</span> : null}
                      </div>
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
        );
      })}
    </aside>
  );
};

export default Sidebar;

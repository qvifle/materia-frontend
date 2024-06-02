import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Bell, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import NotificationsButton from "../buttons/NotificationsButton";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const session = useSession();
  return (
    <header className="bg-background row-start-1 col-start-2 col-end-3 p-[15px] flex items-center justify-between border-b border-b-border">
      <h2 className="scroll-m-20 text-2xl font-medium tracking-tight first:mt-0">
        Projects
      </h2>
      <div className="flex items-center gap-2">
        {session.data?.user.name}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage alt="avatar"></AvatarImage>
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                Logout
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  if (theme === "light") {
                    setTheme("dark");
                    return;
                  }
                  setTheme("light");
                }}
              >
                Theme
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <NotificationsButton />
      </div>
    </header>
  );
};

export default Header;

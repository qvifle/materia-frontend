import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="bg-background row-start-1 col-start-2 col-end-3 p-[15px] flex items-center justify-between border-b border-b-border">
      <h2 className="scroll-m-20 text-2xl font-medium tracking-tight first:mt-0">
        My projects
      </h2>
      <div className="flex items-center gap-2">
        <Button
          variant="destructive"
          onClick={() => signOut({ callbackUrl: "/login" })}>
          Logout
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            if (theme === "light") {
              setTheme("dark");
              return;
            }
            setTheme("light");
          }}>
          Theme
        </Button>
        <Avatar>
          <AvatarImage alt="avatar"></AvatarImage>
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;

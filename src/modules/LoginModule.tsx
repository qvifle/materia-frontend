import LoginForm from "@/components/forms/LoginForm";
import SocialMediaIconLink from "@/components/ui/links/SocialMediaIconLink";
import SocialsContainer from "@/components/ui/links/SocialsContainer";
import { Github as GhIcon, Instagram } from "lucide-react";
import React from "react";

const LoginModule = () => {
  return (
    <main className="h-screen grid grid-cols-[5fr,4fr] bg-[url('/loginImage.png')] bg-cover max-[1100px]:flex max-[1100px]:justify-center">
      <div className="h-screen p-[40px] flex flex-col justify-between max-[1100px]:hidden">
        <div>
          <h1 className="scroll-m-20 text-4xl font-bold text-muted tracking-tight lg:text-5xl text-left ">
            Trello clone
          </h1>
          <h3 className="scroll-m-20 text-2xl font-semibold text-primary-foreground  tracking-tight text-left opacity-50">
            By qvifle
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <SocialMediaIconLink href="https://github.com/qvifle">
            <GhIcon />
          </SocialMediaIconLink>
          <SocialMediaIconLink href="https://www.instagram.com/qvifle.dev?igsh=MTU1aHhibmNiOHg5ag">
            <Instagram />
          </SocialMediaIconLink>
        </div>
      </div>
      <div className="bg-[#9a9a9a20] backdrop-blur-md flex items-center justify-center rounded-tl-2xl rounded-bl-2xl max-[1100px]:w-full max-[1100px]:flex-col max-[1100px]:justify-between p-[40px] max-[400px]:p-5">
        <div className="hidden max-[1100px]:block">
          <h1 className="scroll-m-20 text-4xl font-bold text-muted tracking-tight lg:text-5xl text-right ">
            Trello clone
          </h1>
          <h3 className="scroll-m-20 text-2xl font-semibold text-primary-foreground  tracking-tight text-right opacity-50">
            By qvifle
          </h3>
        </div>

        <LoginForm />
        <div className="hidden max-[1100px]:flex items-center gap-2 ">
          <SocialMediaIconLink href="https://github.com/qvifle">
            <GhIcon />
          </SocialMediaIconLink>
          <SocialMediaIconLink href="https://www.instagram.com/qvifle.dev?igsh=MTU1aHhibmNiOHg5ag">
            <Instagram />
          </SocialMediaIconLink>
        </div>
      </div>
    </main>
  );
};

export default LoginModule;
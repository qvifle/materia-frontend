import CredentialsRegistrationForm from "@/components/forms/CredentialsRegistrationForm";
import RegistrationForm from "@/components/forms/RegistrationForm";
import SocialMediaIconLink from "@/components/ui/links/SocialMediaIconLink";
import SocialsContainer from "@/components/ui/links/SocialsContainer";
import { Github as GhIcon, Instagram } from "lucide-react";
import React from "react";

const RegistrationModule = () => {
  return (
    <main className="h-screen bg-[url('/registrationImage.jpg')] bg-cover grid grid-cols-[4fr,5fr] grid-rows-1 max-[1100px]:flex">
      <div className="bg-background15 filter-opacity-15 backdrop-blur-md flex items-center justify-center rounded-tr-2xl rounded-br-2xl max-[1100px]:w-full max-[1100px]:flex-col max-[1100px]:justify-between p-[40px] max-[400px]:p-5">
        <div className="hidden max-[1100px]:block">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl text-right dark:text-background">
            Trello clone
          </h1>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-right opacity-50 dark:text-background">
            By qvifle
          </h3>
        </div>

        <RegistrationForm />
        <div className="hidden max-[1100px]:flex items-center gap-2 ">
          <SocialMediaIconLink href="https://github.com/qvifle">
            <GhIcon />
          </SocialMediaIconLink>
          <SocialMediaIconLink href="https://www.instagram.com/qvifle.dev?igsh=MTU1aHhibmNiOHg5ag">
            <Instagram />
          </SocialMediaIconLink>
        </div>
      </div>
      <div className="w-full h-full flex flex-col p-[40px] justify-between max-[1100px]:hidden">
        <div>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl text-right dark:text-background ">
            Trello clone
          </h1>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-right opacity-50 dark:text-background">
            By qvifle
          </h3>
        </div>
        <div className="flex items-center gap-2 ml-auto ">
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

export default RegistrationModule;

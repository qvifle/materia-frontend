import React, { HTMLAttributes } from "react";
import SocialMediaIconLink from "./SocialMediaIconLink";
import { Github as GhIcon, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

const SocialsContainer: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div className={cn(className, "flex items-center gap-2")} {...props}>
      <SocialMediaIconLink href="https://github.com/qvifle">
        <GhIcon />
      </SocialMediaIconLink>
      <SocialMediaIconLink href="https://www.instagram.com/qvifle.dev?igsh=MTU1aHhibmNiOHg5ag">
        <Instagram />
      </SocialMediaIconLink>
    </div>
  );
};

export default SocialsContainer;

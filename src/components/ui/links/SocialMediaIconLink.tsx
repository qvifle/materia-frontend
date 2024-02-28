import React, { HTMLAttributes } from "react";
import { Button } from "../button";
import Link from "next/link";

interface ISocialMediaIconLink extends HTMLAttributes<HTMLDivElement> {
  href?: string;
}

const SocialMediaIconLink: React.FC<ISocialMediaIconLink> = ({
  children,
  href = "#",
  ...rest
}) => {
  return (
    <Button variant="outline" size="icon" asChild>
      <Link target="blank" href={href}>
        {children}
      </Link>
    </Button>
  );
};

export default SocialMediaIconLink;

"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { User } from "lucide-react";
import Image from "next/image";
import React, { HTMLAttributes } from "react";

const truncate = (string: string, maxLength: number) => {
  if (string.length > maxLength) {
    const truncatedArray = string.substring(0, maxLength).split(" ");
    truncatedArray.pop();
    const value = truncatedArray.join(" ") + "...";

    return { isTruncated: true, value: value };
  }
  return { isTruncated: false, value: string };
};

interface IProjectCard extends HTMLAttributes<HTMLDivElement> {
  title: string;
  iconUrl: string;
  description: string;
  createdAt: string;
}

const ProjectCard: React.FC<IProjectCard> = ({
  title,
  iconUrl,
  description,
  createdAt,
  ...rest
}) => {
  const { isTruncated: isDescriptionTruncated, value: truncatedDesctiption } =
    truncate(description, 50);

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <Image
              alt="project-icon"
              src={iconUrl || ""}
              width={28}
              height={28}
            />
            <span>{title}</span>
          </div>
        </CardTitle>

        <CardDescription>
          {isDescriptionTruncated ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>{truncatedDesctiption}</span>
                </TooltipTrigger>
                <TooltipContent>{description}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            description
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">{createdAt}</span>
          <div>
            <Avatar>
              <AvatarImage alt="avatar"></AvatarImage>
              <AvatarFallback>
                <div className="bg-border rounded-full p-1">
                  <User />
                </div>
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;

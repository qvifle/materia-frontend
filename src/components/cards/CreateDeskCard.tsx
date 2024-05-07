"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Plus, Check } from "lucide-react";
import { Input } from "../ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import deskService from "@/services/DeskService";

const CreateDeskCard = ({ projectId }: { projectId: string }) => {
  const queryClient = useQueryClient();
  const [isInit, setInit] = useState(true);
  const [value, setValue] = useState("");
  const { mutate } = useMutation({
    mutationKey: [`desk/${projectId}`],
    mutationFn: () =>
      deskService.createDesk(projectId, {
        title: value,
        color: null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desks"] });
      setValue("");
      setInit(true);
    },
  });

  const createNewDesk = () => {
    if (value === "") {
      setInit(true);
      return;
    }
    mutate();
  };

  if (!isInit) {
    return (
      <>
        <Card className="bg-[#9a9a9a20] h-[72px] max-w-[348px]  backdrop-blur-md z-30 hover:bg-[#64646420] duration-100 p-0 flex items-center min-w-[350px]">
          <CardHeader className="px-1 py-4 flex items-center">
            <div className="flex justify-between gap-2 pr-3">
              <CardTitle className="flex justify-start items-center ">
                <Input
                  onChange={(e) => setValue(e.target.value)}
                  autoFocus
                  placeholder=""
                  className="!ring-transparent ring-offset-transparent border-none !bg-transparent focus:ring-transparent  text-2xl font-semibold leading-0 h-[18px] py-5 px-3"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      createNewDesk();
                    }
                  }}
                />
              </CardTitle>
              <Button onClick={createNewDesk} size="icon">
                <Check />
              </Button>
            </div>
          </CardHeader>
        </Card>
        <div
          onClick={() => setInit(true)}
          className="absolute top-0 left-0 h-screen w-screen"
        ></div>
      </>
    );
  }

  return (
    <Card
      onClick={() => setInit(false)}
      className="bg-[#9a9a9a20] max-h-[72px] max-w-[348px] backdrop-blur-md  hover:bg-[#64646420] duration-100 flex items-center justify-center min-w-[350px]"
    >
      <Plus color="hsl(var(--muted-foreground))" />
    </Card>
  );
};

export default CreateDeskCard;

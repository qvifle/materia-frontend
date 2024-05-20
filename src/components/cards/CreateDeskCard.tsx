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
        <Card className="bg-background h-[72px] max-w-[348px] backdrop-blur-md z-30 duration-100 p-0 flex items-center min-w-[350px]">
          <CardHeader className="py-4 flex items-center w-full">
            <CardTitle>
              <div className="flex justify-between items-center w-full">
                <input
                  onChange={(e) => setValue(e.target.value)}
                  autoFocus
                  className="outline-none w-[269px]  text-2xl font-semibold leading-0 bg-transparent"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      createNewDesk();
                    }
                  }}
                />
                <Button onClick={createNewDesk} size="icon">
                  <Check />
                </Button>
              </div>
            </CardTitle>
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
      className="bg-background hover:bg-background_hover max-h-[72px] max-w-[348px] backdrop-blur-md  duration-100 flex items-center justify-center min-w-[350px]"
    >
      <Plus color="hsl(var(--muted-foreground))" />
    </Card>
  );
};

export default CreateDeskCard;

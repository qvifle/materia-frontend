import React, { HTMLAttributes, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deskService from "@/services/DeskService";
import { IDesk } from "@/types/desk.types";

const changeDeskTitleQuery = async (deskId: string, newTitle: string) => {
  try {
    if (newTitle === "") {
      throw new Error("value is empty");
    }
    const { data } = await deskService.updateDeskById(deskId, {
      title: newTitle,
    });
    return data;
  } catch (err) {
    console.error(err);
  }
};

interface IEditDeskCardInput extends HTMLAttributes<HTMLDivElement> {
  desk: IDesk;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditDeskCardInput = ({ desk, toggle, ...rest }: IEditDeskCardInput) => {
  const [value, setValue] = useState(desk.title);
  const queryClient = useQueryClient();
  const { mutate: changeTitle } = useMutation({
    mutationKey: ["desk", desk.id],
    mutationFn: () => changeDeskTitleQuery(desk.id, value),
    onSuccess: () => {
      toggle(false);
      queryClient.invalidateQueries({ queryKey: ["desks"] });
    },
    onError: (err) => {
      toggle(false);
      console.error(err);
    },
  });

  return (
    <div {...rest}>
      <div className="flex items-center justify-between pr-1 w-full h-6">
        <input
          className="z-30 bg-transparent outline-none w-[269px] text-muted-foreground text-2xl h-full font-semibold  rounded-none"
          defaultValue={desk.title}
          value={value}
          autoFocus
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              changeTitle();
            } else if (e.key === "Escape") {
              toggle(false);
            }
          }}
        />
        <Button
          className="h-5 w-5 rounded-[3px] z-30"
          size="icon"
          onClick={() => {
            changeTitle();
          }}
        >
          <Check />
        </Button>
      </div>
      <div
        className="fixed w-full h-full z-10 top-0 left-0"
        onClick={() => toggle(false)}
      ></div>
    </div>
  );
};

export default EditDeskCardInput;

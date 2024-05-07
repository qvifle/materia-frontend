import React, { HTMLAttributes, useState } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import AddTaskButton from "../buttons/AddTaskButton";
import Tasks from "../containers/TasksContainer";
import Ellipsis from "../ui/icons/Ellipsis";
import { Button } from "../ui/button";
import EditDeskButtonsGroup from "../buttons/EditDeskButtonsGroup";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import EditDeskCardInput from "../inputs/EditDeskCardInput";
import { cn } from "@/lib/utils";
import { IDesk } from "@/types/desk.types";

interface IDeskCard extends HTMLAttributes<HTMLDivElement> {
  desk: IDesk;
}

const DeskCard: React.FC<IDeskCard> = ({ desk, ...rest }) => {
  const [tasksCount, setTasksCount] = useState(0);
  const [isTitleEdit, setTitleEdit] = useState(false);
  return (
    <div className="flex flex-col gap-2" {...rest}>
      <Card
        className={cn(
          "bg-[#d0d0d0]  w-[350px]  hover:bg-[#64646420] duration-100 group "
        )}>
        <div className="w-full min-h-[32px] flex justify-end px-2 py-2 opacity-0 group-hover:opacity-100 duration-200">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="h-4 w-4 rounded-[3px] "
                size="icon">
                <Ellipsis className="" color="hsl(var(--muted-foreground))" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="right" className="w-min p-1">
              <EditDeskButtonsGroup
                deskId={desk.id}
                setTitleEdit={setTitleEdit}
              />
            </PopoverContent>
          </Popover>
        </div>

        <CardContent>
          <div className={cn("flex justify-between items-center ")}>
            <CardTitle>
              {isTitleEdit ? (
                <EditDeskCardInput toggle={setTitleEdit} desk={desk} />
              ) : (
                desk.title
              )}{" "}
            </CardTitle>
            <div>
              <span className="text-muted-foreground">{tasksCount}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tasks setTasksCount={setTasksCount} desk={desk} />
      <AddTaskButton desk={desk} />
    </div>
  );
};

export default DeskCard;

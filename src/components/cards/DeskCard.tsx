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
import { ITask } from "@/types/task.types";
import { Droppable } from "@hello-pangea/dnd";

interface IDeskCard extends HTMLAttributes<HTMLDivElement> {
  desk: IDesk;
  tasks: ITask[];
}

const DeskCard: React.FC<IDeskCard> = ({ desk, tasks, ...rest }) => {
  const [isTitleEdit, setTitleEdit] = useState(false);

  return (
    <div className="flex flex-col" {...rest}>
      <Card
        className={cn(
          "bg-[#d0d0d0]  w-[350px] mb-2 hover:bg-[#64646420] duration-100 group ",
        )}
      >
        <div className="w-full min-h-[32px] flex justify-end px-2 py-2 opacity-0 group-hover:opacity-100 duration-200">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="h-4 w-4 rounded-[3px] "
                size="icon"
              >
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
              <span className="text-muted-foreground">{tasks.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Droppable droppableId={desk.id}>
        {(provider) => (
          <div
            ref={provider.innerRef}
            {...provider.droppableProps}
            className="w-full"
          >
            <Tasks desk={desk} tasks={tasks} />
            {provider.placeholder}
            <AddTaskButton desk={desk} />
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DeskCard;

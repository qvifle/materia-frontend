"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useEffect, useRef, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useTheme } from "next-themes";
import unifiedToEmoji from "@/lib/utils/unifiedToEmoji";
import { ScrollArea } from "@/components/ui/scroll-area";

const ProjectIconPicker = ({
  onChange,
  value,
}: {
  onChange: any;
  value?: string;
}) => {
  const [isOpen, setOpen] = useState(false);
  const { theme } = useTheme();
  const pickerRef = useRef<HTMLDivElement>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<string | undefined>(
    value ? unifiedToEmoji(value) : undefined,
  );

  return (
    <Popover open={isOpen} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger>
        <Button
          className="text-[20px]"
          size="icon"
          type="button"
          // onClick={() => setOpen((state) => !state)}
          variant="outline"
        >
          {selectedEmoji}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <ScrollArea className="h-[430px] rounded-md w-[352px] ">
          <Picker
            autoFocus
            theme={theme}
            data={data}
            onEmojiSelect={(e: any) => {
              setSelectedEmoji(e.native);
              onChange(e.unified);
              setOpen(false);
            }}
          />
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default ProjectIconPicker;

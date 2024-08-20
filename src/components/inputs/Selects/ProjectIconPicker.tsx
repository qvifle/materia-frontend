"use client"
import { Button } from "@/components/ui/button"
import React, { ReactNode, useEffect, useRef, useState } from "react"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { useTheme } from "next-themes"
import Emoji from "@/lib/utils/Emoji"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Popover,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react"

const ProjectIconPicker = ({
  onChange,
  value,
}: {
  onChange: any
  value?: string
}) => {
  const [isOpen, setOpen] = useState(false)
  const { theme } = useTheme()
  const pickerRef = useRef<HTMLDivElement>(null)
  const [selectedEmoji, setSelectedEmoji] = useState<ReactNode | undefined>(
    value ? <Emoji unifiedCode={value} /> : undefined,
  )

  return (
    // <Popover open={isOpen} onOpenChange={setOpen} modal={true}>
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button
          className="text-[20px]"
          size="icon"
          type="button"
          variant="outline"
        >
          {selectedEmoji}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Picker
          autoFocus
          theme={theme}
          data={data}
          onEmojiSelect={(e: any) => {
            setSelectedEmoji(e.native)
            onChange(e.unified)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

export default ProjectIconPicker

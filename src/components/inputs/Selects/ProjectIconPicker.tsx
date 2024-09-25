"use client"
import React, { ReactNode, useEffect, useState } from "react"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { useTheme } from "next-themes"
import Emoji from "@/lib/utils/Emoji"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react"
import { useMediaQuery } from "@uidotdev/usehooks"

const ProjectIconPicker = ({
  onChange,
  value,
}: {
  onChange: any
  value?: string
}) => {
  const { theme } = useTheme()
  const [selectedEmoji, setSelectedEmoji] = useState<ReactNode | undefined>(
    value ? <Emoji unifiedCode={value} /> : undefined,
  )

  const isMobile = useMediaQuery("only screen and (max-width : 320px)")

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button
          className="h-full w-full bg-default-100 text-[32px]"
          type="button"
          isIconOnly
        >
          {selectedEmoji}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Picker
          autoFocus
          theme={theme}
          perLine={isMobile ? 5 : 7}
          data={data}
          onEmojiSelect={(e: any) => {
            setSelectedEmoji(e.native)
            onChange(e.unified)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

export default ProjectIconPicker

"use client"
import React, { useState } from "react"
import { Plus, Check } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "../ui/button"
import deskService from "@/services/DeskService"
import { Card, CardBody } from "@nextui-org/react"
import { useClickAway } from "@uidotdev/usehooks"

const CreateDeskCard = ({ projectId }: { projectId: string }) => {
  const queryClient = useQueryClient()
  const [isInit, setInit] = useState(true)
  const [value, setValue] = useState("")
  const ref = useClickAway(() => setInit(true))

  const reset = () => {
    setValue("")
    setInit(true)
  }

  const { mutate: createDesk } = useMutation({
    mutationKey: ["desk", projectId],
    mutationFn: () =>
      deskService.createDesk(projectId, {
        title: value,
        color: null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desks"] })
      reset()
    },
  })

  const createNewDesk = () => {
    if (value === "") {
      reset()
      return
    }
    createDesk()
  }

  return (
    <Card
      isPressable={isInit}
      onClick={() => setInit(false)}
      className="outline-no h-[64px] min-w-[calc(100vw-18px-16px)] cursor-pointer px-4 py-5"
    >
      {isInit ? (
        <CardBody className="flex items-center justify-center p-0">
          <Plus color="var(--gray-11)" />
        </CardBody>
      ) : (
        <div
          ref={ref as any}
          className="flex w-full items-center justify-between gap-2"
        >
          <input
            className="w-full font-semibold outline-none"
            value={value}
            autoFocus
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createNewDesk()
              } else if (e.key === "Escape") {
                reset()
              }
            }}
          />
          <Button
            className="h-6 w-6 min-w-6 p-0 outline-none"
            size="sm"
            color="primary"
            onClick={() => createDesk()}
          >
            <Check size={14} />
          </Button>
        </div>
      )}
    </Card>
  )
}

export default CreateDeskCard

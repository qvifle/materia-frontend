"use client"
import deskService from "@/services/DeskService"
import { IDesk } from "@/types/desk.types"
import { Button } from "@nextui-org/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useClickAway } from "@uidotdev/usehooks"
import { Check } from "lucide-react"
import React, { FC } from "react"

interface UpdateDeskTitleInputProps {
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setTitleEdit: React.Dispatch<React.SetStateAction<boolean>>
  desk: IDesk
}

const UpdateDeskTitleInput: FC<UpdateDeskTitleInputProps> = ({
  title,
  setTitle,
  setTitleEdit,
  desk,
}) => {
  const queryClient = useQueryClient()

  const reset = () => {
    setTitle(desk.title)
    setTitleEdit(false)
  }

  const ref = useClickAway(() => reset())

  const changeDeskTitleQuery = async (deskId: string, newTitle: string) => {
    try {
      if (newTitle === "") {
        reset()
        return
      }
      const { data } = await deskService.updateDeskById(deskId, {
        title: newTitle,
      })
      return data
    } catch (err) {
      console.error(err)
    }
  }

  const { mutate: updateTitle } = useMutation({
    mutationKey: ["desk", desk.id],
    mutationFn: () => changeDeskTitleQuery(desk.id, title),
    onSuccess: () => {
      setTitleEdit(false)
      queryClient.invalidateQueries({ queryKey: ["desks"] })
    },
    onError: (err) => {
      setTitleEdit(false)
      console.error(err)
    },
  })

  return (
    <div
      ref={ref as any}
      className="flex w-full items-center justify-between gap-2"
    >
      <input
        autoFocus
        id="update-desk-title-input"
        className="w-full font-semibold outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateTitle()
          } else if (e.key === "Escape") {
            setTitleEdit(false)
          }
        }}
      />
      <Button
        className="h-6 w-6 min-w-6 p-0 outline-none"
        size="sm"
        color="primary"
        onClick={() => updateTitle()}
      >
        <Check size={14} />
      </Button>
    </div>
  )
}

export default UpdateDeskTitleInput

import React from "react"
import { Button } from "../ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import deskService from "@/services/DeskService"

interface IEditDeskButtonGroup {
  deskId: string
  setTitleEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const EditDeskButtonsGroup: React.FC<IEditDeskButtonGroup> = ({
  deskId,
  setTitleEdit,
}) => {
  const queryClient = useQueryClient()
  const { mutate: deleteDesk } = useMutation({
    mutationKey: ["desk", deskId],
    mutationFn: () => deskService.deleteDeskById(deskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desks"] })
    },
  })

  return (
    <div className="flex flex-col p-0">
      <Button variant="ghost" size="sm" onClick={() => setTitleEdit(true)}>
        Title
      </Button>
      <Button
        onClick={() => {
          setTitleEdit(false)
          deleteDesk()
        }}
        variant="destructive"
        size="sm"
      >
        Delete
      </Button>
    </div>
  )
}

export default EditDeskButtonsGroup

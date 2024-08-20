import {
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"
import { Pencil, Trash2 } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import deskService from "@/services/DeskService"
import UpdateDeskTitleInput from "../inputs/UpdateDeskTitleInput"
import React, { FC, HTMLAttributes, useEffect, useState } from "react"
import { IDesk } from "@/types/desk.types"
import Ellipsis from "../ui/icons/Ellipsis"
import focusOnElementWithoutScroll from "@/lib/utils/focus-on-element-without-scroll"

interface DeskCardProps {
  desk: IDesk
}

const DeskCard: FC<DeskCardProps> = ({ desk }) => {
  const [isTitleEdit, setTitleEdit] = useState(false)
  const [title, setTitle] = useState(desk.title || "")

  const queryClient = useQueryClient()
  const { mutate: deleteDesk } = useMutation({
    mutationKey: ["desk", desk.id],
    mutationFn: () => deskService.deleteDeskById(desk.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desks"] })
    },
  })

  return (
    <Card className="relative mb-1 h-[64px] px-4 py-5">
      <CardBody className="flex w-full flex-row items-center justify-between p-0">
        {isTitleEdit ? (
          <UpdateDeskTitleInput
            setTitle={setTitle}
            setTitleEdit={setTitleEdit}
            desk={desk}
            title={title}
          />
        ) : (
          <button
            onClick={() => {
              focusOnElementWithoutScroll("update-desk-title-input")
              setTitleEdit(true)
            }}
            className="cursor-pointer font-semibold"
          >
            {title}
          </button>
        )}
        <Dropdown>
          <DropdownTrigger>
            <button className="outline-none">
              <Ellipsis color="var(--gray-11)" className="rotate-90" />
            </button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
              key="edit-title"
              startContent={<Pencil size={14} />}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                focusOnElementWithoutScroll("update-desk-title-input")
                setTitleEdit(true)
              }}
            >
              Title
            </DropdownItem>
            <DropdownItem
              key="delete-desk"
              startContent={<Trash2 size={14} color="var(--error-9)" />}
              onClick={() => deleteDesk()}
            >
              <span className="text-danger-600">Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardBody>
    </Card>
  )
}

export default DeskCard

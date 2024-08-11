"use client"

import React, { useEffect, useState } from "react"
import deskService from "@/services/DeskService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import DeskCard from "../cards/DeskWIdget"
import getIndexOfElementById from "@/lib/utils/getIndexOfElementById"
import taskService from "@/services/TaskService"
import { DragDropContext, DropResult } from "@hello-pangea/dnd"
import { arrayMove } from "@/lib/utils/arrayMove"
import insert from "@/lib/utils/insert"
import { IDesk } from "@/types/desk.types"
interface IDesksContainer {
  projectId: string
}

interface IChangeTaskOrderId {
  taskId: string
  overTaskId: string
}

interface IAddToDesk {
  taskId: string
  overDeskId: string
}

const DesksContainer: React.FC<IDesksContainer> = ({ projectId }) => {
  const queryClient = useQueryClient()
  const [reorderDesks, setReorderDesks] = useState<IDesk[]>([])

  const {
    data: desks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["desks"],
    queryFn: () => deskService.getDesks(projectId),
  })

  const { mutate: changeOrder } = useMutation({
    mutationKey: ["changeOrderId"],
    mutationFn: async ({ taskId, overTaskId }: IChangeTaskOrderId) =>
      taskService.changeOrderById(taskId, { overTaskId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desks"] })
    },
  })

  const { mutate: changeDesk } = useMutation({
    mutationKey: ["changeDesk"],
    mutationFn: async ({ taskId, overTaskId }: IChangeTaskOrderId) =>
      taskService.changeDeskById(taskId, { overTaskId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desks"] })
    },
  })

  const { mutate: addToDesk } = useMutation({
    mutationKey: ["addToDesk"],
    mutationFn: async ({ taskId, overDeskId }: IAddToDesk) =>
      taskService.addToDesk(taskId, { overDeskId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desks"] })
    },
  })

  const handleDragEnd = (e: DropResult) => {
    if (!e.destination) {
      return
    }

    const activeTaskId = e.draggableId
    const activeDesk = reorderDesks.find((desk) =>
      desk.tasks.some((task) => task.id === activeTaskId),
    )

    if (!activeDesk) {
      return
    }

    const activeTaskIndex = e.source.index
    const overTaskIndex = e.destination.index

    const activeDeskId = activeDesk.id
    const overDeskId = e.destination.droppableId

    if (activeDeskId === overDeskId && activeTaskIndex === overTaskIndex) {
      return
    }

    const activeDeskIndex = getIndexOfElementById(activeDeskId, reorderDesks)
    const overDeskIndex = getIndexOfElementById(overDeskId, reorderDesks)
    const overTask = reorderDesks[overDeskIndex].tasks[overTaskIndex]
    if (!overTask) {
      // empty desk
      const activeTask = reorderDesks[activeDeskIndex].tasks[activeTaskIndex]
      setReorderDesks((prev) => {
        return prev.map((desk) => {
          if (desk.id === activeDeskId) {
            return {
              ...desk,
              tasks: desk.tasks.filter((task) => task.id != activeTaskId),
            }
          } else if (desk.id === overDeskId) {
            return {
              ...desk,
              tasks: [activeTask],
            }
          }
          return desk
        })
      })

      addToDesk({ taskId: activeTaskId, overDeskId: overDeskId })
      return
    }

    const { id: overTaskId } = overTask

    if (activeDeskId === overDeskId) {
      // reorder in same desk
      setReorderDesks((prev) => {
        const newState = [...prev]
        newState[activeDeskIndex] = {
          ...newState[activeDeskIndex],
          tasks: arrayMove(
            newState[activeDeskIndex].tasks,
            activeTaskIndex,
            overTaskIndex,
          ),
        }

        return newState
      })

      changeOrder({ overTaskId: overTaskId, taskId: activeTaskId })
      return
    }
    //reorder in not the same desks
    setReorderDesks((prev) => {
      const activeDeskIndex = getIndexOfElementById(activeDeskId, prev)
      return prev.map((desk) => {
        if (desk.id === activeDeskId) {
          return {
            ...desk,
            tasks: prev[activeDeskIndex].tasks.filter(
              (task) => task.id != activeTaskId,
            ),
          }
        } else if (desk.id === overDeskId) {
          return {
            ...desk,
            tasks: insert(activeDesk.tasks[activeTaskIndex], overTaskIndex, [
              ...desk.tasks,
            ]),
          }
        }

        return desk
      })
    })
    changeDesk({ overTaskId: overTaskId, taskId: activeTaskId })
  }

  const [dragging, setDragging] = useState(false)

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  useEffect(() => {
    if (desks) {
      setReorderDesks(desks.data)
    }
  }, [desks])

  if (isLoading) {
    return "Loading"
  }

  if (reorderDesks.length === 0) {
    return null
  }

  if (isError) {
    return "Error"
  }

  return (
    <>
      <DragDropContext
        onBeforeCapture={() => {
          return
        }}
        onBeforeDragStart={() => {
          return
        }}
        onDragStart={() => {
          return
        }}
        onDragEnd={handleDragEnd}
      >
        {reorderDesks.map((desk, key) => (
          <DeskCard key={key} desk={desk} tasks={desk.tasks} />
        ))}
      </DragDropContext>
    </>
  )
}

export default DesksContainer

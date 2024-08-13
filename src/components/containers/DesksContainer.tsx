"use client"

import React, { useEffect, useState } from "react"
import deskService from "@/services/DeskService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import DeskCard from "../cards/DeskWIdget"
import getIndexOfElementById from "@/lib/utils/getIndexOfElementById"
import taskService from "@/services/TaskService"
import { arrayMove } from "@/lib/utils/arrayMove"
import insert from "@/lib/utils/insert"
import { IDesk } from "@/types/desk.types"
import {
  closestCenter,
  closestCorners,
  defaultDropAnimation,
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
} from "@dnd-kit/core"
import TaskCard from "../cards/TaskCard"
import { ITask, TaskStatus } from "@/types/task.types"
import fakeData from "./data.json"
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
  const [activeTask, setActiveTask] = useState<undefined | ITask>(undefined)
  const [reorderDesks, setReorderDesks] = useState<IDesk[]>(fakeData as any)

  // const {
  //   data: desks,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["desks"],
  //   queryFn: async () => {
  //     const { data } = await deskService.getDesks(projectId)
  //     return data
  //   },
  // })

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

  const handleDragStart = ({ active }: DragStartEvent) => {
    const desk = reorderDesks.find(
      // @ts-ignore
      (el) => el.id === active.data.current.sortable.containerId,
    )

    const task = desk?.tasks.find((el) => el.id === active.id)
    setActiveTask(task)
  }

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    // Find the containers
    const activeDeskId = active.data.current?.sortable?.containerId
    const overDeskId = over?.data.current?.sortable?.containerId

    if (!activeDeskId || !overDeskId || activeDeskId === overDeskId) {
      return
    }

    setReorderDesks((desks) => {
      const activeTasks = desks.find((desk) => desk.id === activeDeskId)!.tasks
      const overTasks = desks.find((desk) => desk.id === overDeskId)!.tasks

      const activeTaskIndex = activeTasks.findIndex((el) => el.id == active.id)
      const overTaskIndex = overTasks.findIndex((el) => el.id == over?.id)

      const activeTask = activeTasks[activeTaskIndex]
      return desks.map((desk) => {
        if (desk.id === activeDeskId) {
          return {
            ...desk,
            tasks: desk.tasks.filter((task) => task.id !== active.id),
          }
        }

        if (desk.id === overDeskId) {
          return {
            ...desk,
            tasks: [
              ...desk.tasks.slice(0, activeTaskIndex),
              activeTask,
              ...desk.tasks.slice(activeTaskIndex, desk.tasks.length),
            ],
          }
        }
        return desk
      })
    })
  }

  // const handleDragEnd = (e: DropResult) => {
  //   if (!e.destination) {
  //     return
  //   }

  //   const activeTaskId = e.draggableId
  //   const activeDesk = reorderDesks.find((desk) =>
  //     desk.tasks.some((task) => task.id === activeTaskId),
  //   )

  //   if (!activeDesk) {
  //     return
  //   }

  //   const activeTaskIndex = e.source.index
  //   const overTaskIndex = e.destination.index

  //   const activeDeskId = activeDesk.id
  //   const overDeskId = e.destination.droppableId

  //   if (activeDeskId === overDeskId && activeTaskIndex === overTaskIndex) {
  //     return
  //   }

  //   const activeDeskIndex = getIndexOfElementById(activeDeskId, reorderDesks)
  //   const overDeskIndex = getIndexOfElementById(overDeskId, reorderDesks)
  //   const overTask = reorderDesks[overDeskIndex].tasks[overTaskIndex]
  //   if (!overTask) {
  //     // empty desk
  //     const activeTask = reorderDesks[activeDeskIndex].tasks[activeTaskIndex]
  //     setReorderDesks((prev) => {
  //       return prev.map((desk) => {
  //         if (desk.id === activeDeskId) {
  //           return {
  //             ...desk,
  //             tasks: desk.tasks.filter((task) => task.id != activeTaskId),
  //           }
  //         } else if (desk.id === overDeskId) {
  //           return {
  //             ...desk,
  //             tasks: [activeTask],
  //           }
  //         }
  //         return desk
  //       })
  //     })

  //     addToDesk({ taskId: activeTaskId, overDeskId: overDeskId })
  //     return
  //   }

  //   const { id: overTaskId } = overTask

  //   if (activeDeskId === overDeskId) {
  //     // reorder in same desk
  //     setReorderDesks((prev) => {
  //       const newState = [...prev]
  //       newState[activeDeskIndex] = {
  //         ...newState[activeDeskIndex],
  //         tasks: arrayMove(
  //           newState[activeDeskIndex].tasks,
  //           activeTaskIndex,
  //           overTaskIndex,
  //         ),
  //       }

  //       return newState
  //     })

  //     changeOrder({ overTaskId: overTaskId, taskId: activeTaskId })
  //     return
  //   }
  //   //reorder in not the same desks
  //   setReorderDesks((prev) => {
  //     const activeDeskIndex = getIndexOfElementById(activeDeskId, prev)
  //     return prev.map((desk) => {
  //       if (desk.id === activeDeskId) {
  //         return {
  //           ...desk,
  //           tasks: prev[activeDeskIndex].tasks.filter(
  //             (task) => task.id != activeTaskId,
  //           ),
  //         }
  //       } else if (desk.id === overDeskId) {
  //         return {
  //           ...desk,
  //           tasks: insert(activeDesk.tasks[activeTaskIndex], overTaskIndex, [
  //             ...desk.tasks,
  //           ]),
  //         }
  //       }

  //       return desk
  //     })
  //   })
  //   changeDesk({ overTaskId: overTaskId, taskId: activeTaskId })
  // }

  // useEffect(() => {
  //   setReorderDesks(desks)
  // }, [desks])

  useEffect(() => {
    console.log(reorderDesks)
  }, [reorderDesks])

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  }

  if (!reorderDesks || reorderDesks.length === 0) {
    return null
  }

  return (
    <>
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        collisionDetection={closestCenter}
      >
        {reorderDesks.map((desk, key) => (
          <DeskCard key={desk.id} desk={desk} />
        ))}

        <DragOverlay dropAnimation={dropAnimation}>
          {activeTask && <TaskCard task={activeTask} />}
        </DragOverlay>
      </DndContext>
    </>
  )
}

export default DesksContainer

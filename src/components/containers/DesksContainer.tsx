"use client"

import React, { useEffect, useOptimistic, useState } from "react"
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
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  useSensors,
  useSensor,
  PointerSensor,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core"
import TaskCard from "../cards/TaskCard"
import { ITask, TaskStatus } from "@/types/task.types"

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
  const [reorderDesks, setReorderDesks] = useState<IDesk[]>([])
  const [isOvered, setOvered] = useState(false)

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  )

  const { data, isLoading, isError } = useQuery({
    queryKey: ["desks"],
    queryFn: async () => {
      const { data } = await deskService.getDesks(projectId)
      return data
    },
  })

  const { mutate: changeOrder } = useMutation({
    mutationKey: ["changeOrderId"],
    mutationFn: async ({ taskId, overTaskId }: IChangeTaskOrderId) =>
      taskService.changeOrderById(taskId, { overTaskId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desks"] })
    },
  })
  const { mutate: changeDeskById } = useMutation({
    mutationKey: ["changeDeskById"],
    mutationFn: async ({ taskId, overTaskId }: IChangeTaskOrderId) =>
      taskService.changeDeskById(taskId, { overTaskId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desks"] })
    },
  })

  const { mutate: addToEmptyDesk } = useMutation({
    mutationKey: ["addToEmptyDesk"],
    mutationFn: async ({ taskId, overDeskId }: IAddToDesk) =>
      taskService.addToDesk(taskId, { overDeskId: overDeskId }),
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
    if (isOvered) {
      return
    }

    // Find the containers
    const activeDeskId = active.data.current?.sortable?.containerId
    const overDeskId = over?.data.current?.sortable?.containerId

    if (!over) {
      return
    }

    const overDesk = reorderDesks.find((el) => el.id === over.id)

    if (!!overDesk && activeDeskId != over.id && overDesk.tasks.length === 0) {
      addToEmptyDesk({
        taskId: active.id as string,
        overDeskId: over.id as string,
      })
      setReorderDesks((desks) => {
        const activeDesk = desks.find((desk) => desk.id === activeDeskId)
        const activeTask = activeDesk?.tasks.find(
          (task) => task.id == active.id,
        ) as ITask

        return desks.map((desk) => {
          if (desk.id === activeDeskId) {
            return {
              ...desk,
              tasks: desk.tasks.filter((task) => task.id !== active.id),
            }
          }

          if (desk.id == over.id) {
            return {
              ...desk,
              tasks: [activeTask],
            }
          }

          return desk
        })
      })
      setOvered(true)
      return
    }

    if (
      !activeDeskId ||
      !overDeskId ||
      activeDeskId === overDeskId ||
      !over.data.current
    ) {
      return
    }

    changeDeskById({
      taskId: active.id as string,
      overTaskId: over.id as string,
    })
    setReorderDesks((desks) => {
      const activeTasks = desks.find((desk) => desk.id === activeDeskId)!.tasks

      const activeTaskIndex = activeTasks.findIndex((el) => el.id == active.id)

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

    setOvered(true)
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const activeDeskId = active.data.current?.sortable?.containerId
    const overDeskId = over?.data.current?.sortable?.containerId

    if (!activeDeskId || !overDeskId || overDeskId != activeDeskId) {
      return
    }

    changeOrder({ taskId: active.id as string, overTaskId: over.id as string })
    setReorderDesks((desks) => {
      const tasks = desks.find((desk) => desk.id === activeDeskId)!.tasks
      const activeTaskIndex = tasks.findIndex((el) => el.id == active.id)
      const overTaskIndex = tasks.findIndex((el) => el.id == over?.id)
      const newState = desks.map((desk) => {
        if (desk.id === activeDeskId) {
          return {
            ...desk,
            tasks: arrayMove(tasks, activeTaskIndex, overTaskIndex),
          }
        }
        return desk
      })
      return newState
    })
  }

  useEffect(() => {
    setReorderDesks(data)
  }, [data])

  useEffect(() => {
    if (!isOvered) {
      return
    }

    setTimeout(() => {
      setOvered(false)
    }, 100)
  }, [isOvered])

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  }

  if (isLoading) {
    return "loading"
  }

  if (!reorderDesks || reorderDesks.length === 0) {
    return null
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
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

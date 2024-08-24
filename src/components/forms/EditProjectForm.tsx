"use client"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import useDialog from "@/lib/hooks/useDialog"
import ProjectIconPicker from "../inputs/Selects/ProjectIconPicker"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import projectService from "@/services/ProjectService"
import { useParams } from "next/navigation"
import { Loader } from "lucide-react"
import {
  Button,
  Input,
  ModalBody,
  ModalFooter,
  Textarea,
} from "@nextui-org/react"

interface EditProjectFormFields {
  title?: string
  description?: string
  iconUrl?: string
}

const EditProjectForm = () => {
  const queryClient = useQueryClient()
  const { close } = useDialog()
  const params = useParams()
  const projectId = params.projectId as string

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditProjectFormFields>()

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const { data } = await projectService.getProjectById(projectId)
      return data
    },
  })

  const { mutate: editProject } = useMutation({
    mutationKey: ["edit-project"],
    mutationFn: async (newProject: EditProjectFormFields) =>
      projectService.updateProjectById(projectId, newProject),
    onSuccess: () => {
      toast.success("Project succesfully edited!")
      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      })
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      })
      close()
    },
    onError: () => {
      toast.error("Something went wrong")
    },
  })

  const onSubmit = async (values: EditProjectFormFields) => {
    editProject(values)
  }

  if (isLoading) {
    return <Loader className="mx-auto my-[40px] animate-spin" />
  }

  if (!project) {
    close()
    return "Error"
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <ModalBody>
        <div className="grid grid-cols-[64px,1fr] grid-rows-1 items-start gap-2">
          <Controller
            name="iconUrl"
            control={control}
            defaultValue={project.iconUrl ?? ""}
            render={({ field: { value, ...rest } }) => (
              <ProjectIconPicker value={value ?? "1F4C1"} {...rest} />
            )}
          />
          <Controller
            name="title"
            control={control}
            defaultValue={project.title}
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <Input
                size="lg"
                autoFocus
                label="Title"
                placeholder="Facebook"
                labelPlacement="inside"
                isInvalid={!!errors.title?.message}
                {...field}
              />
            )}
          />
        </div>
        <Controller
          name="description"
          control={control}
          defaultValue={project.description ?? ""}
          render={({ field: { value, ...rest } }) => (
            <Textarea
              label="Description"
              placeholder="Create a Social network"
              labelPlacement="inside"
              size="lg"
              value={value ?? ""}
              {...rest}
            />
          )}
        />
      </ModalBody>
      <ModalFooter>
        <Button onClick={close} type="button">
          Close
        </Button>
        <Button type="submit" color="primary">
          Create
        </Button>
      </ModalFooter>{" "}
    </form>
  )
}

export default EditProjectForm

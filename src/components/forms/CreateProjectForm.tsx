"use client"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import useDialog from "@/lib/hooks/useDialog"
import ProjectIconPicker from "../inputs/Selects/ProjectIconPicker"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import projectService from "@/services/ProjectService"

import {
  Button,
  Input,
  ModalBody,
  ModalFooter,
  Textarea,
} from "@nextui-org/react"
import { IProjectFormFields } from "@/types/project.types"

const CreateProjectForm = () => {
  const queryClient = useQueryClient()
  const { close } = useDialog()

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IProjectFormFields>()

  const { mutate: createProject } = useMutation({
    mutationKey: ["projects"],
    mutationFn: async (newProject: IProjectFormFields) =>
      projectService.createProject(newProject),
    onSuccess: () => {
      toast.success("New project succesfully created!")
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      close()
    },
    onError: (err: any) => {
      if (!!err.response.data) {
        toast.error(err.response.data)
        return
      }
      toast.error("Something went wrong")
    },
  })

  const onSubmit = async (values: IProjectFormFields) => {
    createProject(values)
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <ModalBody>
        <div className="grid grid-cols-[64px,1fr] grid-rows-1 items-start gap-2">
          <Controller
            name="iconUrl"
            control={control}
            defaultValue="1F4C1"
            render={({ field: { value, ...rest } }) => (
              <ProjectIconPicker value={value ?? "1F4C1"} {...rest} />
            )}
          />
          <Controller
            name="title"
            control={control}
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

export default CreateProjectForm

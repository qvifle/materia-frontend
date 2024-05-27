"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DialogClose, DialogFooter } from "../ui/dialog";
import useDialog from "@/lib/hooks/useDialog";
import ProjectIconPicker from "../inputs/Selects/ProjectIconPicker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import projectService from "@/services/ProjectService";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useParams } from "next/navigation";
import { Loader } from "lucide-react";

const EditProjectSchema = z.object({
  title: z.string().optional(),
  description: z.string().nullable().optional(),
  iconUrl: z.string().nullable().optional(),
});

type IEditProjectSchema = z.infer<typeof EditProjectSchema>;

const EditProjectForm = () => {
  const queryClient = useQueryClient();
  const { close } = useDialog();
  const params = useParams();
  const projectId = params.projectId as string;

  const form = useForm<IEditProjectSchema>({
    resolver: zodResolver(EditProjectSchema),
  });

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const { data } = await projectService.getProjectById(projectId);
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["edit-project"],
    mutationFn: async (newProject: IEditProjectSchema) =>
      projectService.updateProjectById(projectId, newProject),
    onSuccess: () => {
      toast.success("Project succesfully edited!");
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSubmit = async (values: IEditProjectSchema) => {
    await mutateAsync(values);
    close();
  };

  if (isLoading) {
    return <Loader className="animate-spin mx-auto my-[40px]" />;
  }

  if (!project) {
    return "Error";
  }

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-[50px,1fr] grid-rows-1 items-start ">
          <FormField
            control={form.control}
            name="iconUrl"
            defaultValue={project.iconUrl ?? ""}
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <FormControl>
                  <ProjectIconPicker
                    value={typeof value === "string" ? value : undefined}
                    onChange={onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            defaultValue={project.title}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Edit Facebook" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          defaultValue={project.description ?? ""}
          name="description"
          render={({ field }) => {
            const { value, ...fieldValues } = field;
            const stringValue = value === null ? "" : value;
            return (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Blah blah blah..."
                    value={stringValue}
                    {...fieldValues}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <DialogFooter className="sm:justify-end">
          <DialogClose onClick={close} asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button>Edit</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default EditProjectForm;

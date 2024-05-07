"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DialogClose, DialogFooter } from "../ui/dialog";
import useDialog from "@/lib/hooks/useDialog";
import ProjectIconPicker from "../inputs/Selects/ProjectIconPicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

const CreateProjectSchema = z.object({
  title: z.string(),
  description: z.string().nullable().optional(),
  iconUrl: z.string().nullable(),
});

type ICreateProjectSchema = z.infer<typeof CreateProjectSchema>;

const CreateProjectForm = () => {
  const queryClient = useQueryClient();
  const { close } = useDialog();

  const form = useForm<ICreateProjectSchema>({
    resolver: zodResolver(CreateProjectSchema),
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["projects"],
    mutationFn: async (newProject: ICreateProjectSchema) =>
      projectService.createProject(newProject),
    onSuccess: () => {
      toast.success("New project succesfully created!");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSubmit = async (values: ICreateProjectSchema) => {
    await mutateAsync(values);
    close();
  };

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-[50px,1fr] grid-rows-1 items-start ">
          <FormField
            control={form.control}
            name="iconUrl"
            defaultValue="1f4c2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <FormControl>
                  <ProjectIconPicker
                    value={
                      typeof field.value === "string" ? field.value : undefined
                    }
                    onChange={(e: any) => {
                      field.onChange(e);
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Create Facebook" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
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
          <Button>Create</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CreateProjectForm;

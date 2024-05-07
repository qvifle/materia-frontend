"use client";
import requiredFormFieldMessage from "@/lib/consts/requiredFormFieldMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PasswordInput } from "../ui/passwordInput";
import api from "@/lib/utils/api";
import { signIn } from "next-auth/react";
import authService from "@/services/AuthService";

const fromSchema = z
  .object({
    name: z.string().min(2),
    email: z
      .string()
      .email("This is not valid Email")
      .min(1, requiredFormFieldMessage),
    password: z.string().min(8, "This field must have at least 8 symbols"),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const CredentialsRegistrationForm = () => {
  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
  });

  const onSubmit = async (values: z.infer<typeof fromSchema>) => {
    const { confirmPassword, ...fields } = values;
    const { status } = await authService.signUp(fields);

    if (status != 201) {
      return;
    }

    signIn("credentials", {
      email: fields.email,
      password: fields.password,
      callbackUrl: "/home",
    });
  };
  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Input your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Input your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Input your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Confirm your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Sign up
        </Button>
      </form>
    </Form>
  );
};

export default CredentialsRegistrationForm;

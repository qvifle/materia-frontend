"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import requiredFormFieldMessage from "@/lib/consts/requiredFormFieldMessage";
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
import { signIn } from "next-auth/react";
import { PasswordInput } from "../ui/passwordInput";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const fromSchema = z.object({
  email: z
    .string()
    .email("This is not valid Email")
    .min(1, requiredFormFieldMessage),
  password: z.string().min(8, "This field must have at least 8 symbols"),
});

const CredentialsLoginForm = () => {
  const { push } = useRouter();
  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
  });

  const onSubmit = async (values: z.infer<typeof fromSchema>) => {
    try {
      const res = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (!res) {
        throw new Error("something went wrong");
      }

      if (!res.ok) {
        toast.error("Wrong password or User doesnt exist");
        return;
      }

      push("/home");
    } catch (err) {
      toast.error("Wrong password or User doesnt exist");
      console.log(err);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="tester@gmail.com" {...field} />
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
                <PasswordInput placeholder="superSecret" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Login
        </Button>
      </form>
    </Form>
  );
};

export default CredentialsLoginForm;

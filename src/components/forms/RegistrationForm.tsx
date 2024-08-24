"use client";
import requiredFormFieldMessage from "@/lib/constants/requiredFormFieldMessage";
import authService from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import PasswordInput from "../inputs/PasswordInput";

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

const RegistrationForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof fromSchema>>({
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <Input
            className="mb-2"
            size="lg"
            type="text"
            label="Name"
            placeholder="Enter your Name"
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input
            className="mb-2"
            size="lg"
            type="email"
            label="Email"
            placeholder="Enter your Email"
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <PasswordInput
            className="mb-2"
            size="lg"
            label="Password"
            placeholder="Enter your Password"
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <PasswordInput
            className="mb-2"
            size="lg"
            label="Confirm password"
            placeholder="Confirm your password"
            isInvalid={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
            {...field}
          />
        )}
      />
      <div className="w-full flex justify-end">
        <Button type="submit" size="lg" color="primary">
          Sign up
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;

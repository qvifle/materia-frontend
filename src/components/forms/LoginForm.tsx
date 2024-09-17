"use client"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import requiredFormFieldMessage from "@/lib/constants/requiredFormFieldMessage"
import { z } from "zod"
import { signIn } from "next-auth/react"
import toast from "react-hot-toast"
import PasswordInput from "@/components/inputs/PasswordInput"
import { useRouter } from "next/navigation"
import { Button, Input } from "@nextui-org/react"
import handleSignInError from "@/lib/utils/handleSigninError"

const LoginForm = () => {
  const { push } = useRouter()
  const fromSchema = z.object({
    email: z
      .string()
      .email("This is not valid Email")
      .min(1, requiredFormFieldMessage),
    password: z.string().min(8, "This field must have at least 8 symbols"),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
  })

  const onSubmit = async (values: z.infer<typeof fromSchema>) => {
    try {
      const res = await signIn("credentials", {
        ...values,
        redirect: false,
      })

      if (!res || !res.ok) {
        throw res
      }

      push("/home")
    } catch (err: any) {
      console.log(err)
      handleSignInError(err)
    }
  }

  
  return (
    <form onSubmit={handleSubmit(onSubmit)} action="">
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input
            className="mb-2"
            size="lg"
            type="email"
            label="Email"
            placeholder="Enter your email"
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
            placeholder="Enter your password"
            size="lg"
            label="Password"
            className="mb-4"
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            {...field}
          />
        )}
      />
      <div className="flex w-full justify-end">
        <Button
          type="submit"
          color="primary"
          size="lg"
          className="w-[100px] font-medium"
        >
          Login
        </Button>
      </div>
    </form>
  )
}

export default LoginForm

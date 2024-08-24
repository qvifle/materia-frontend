"use client"
import React, { useEffect } from "react"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react"
import Link from "next/link"
import { Github as GhIcon, Instagram } from "lucide-react"
import LoginForm from "@/components/forms/LoginForm"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const LoginModule = () => {
  const { status } = useSession()
  const { push } = useRouter()

  if (status === "authenticated") {
    push("/home")
  }

  return (
    <main className="h-full min-h-screen bg-[url('/loginImage.png')] bg-cover">
      <div className="flex h-screen items-center md:grid md:grid-cols-[4fr,5fr]">
        <section className="hidden h-screen w-full flex-col justify-between p-[40px] md:flex">
          <div className="flex max-w-max flex-col">
            <h1 className="w-full text-left text-4xl font-semibold leading-[36px] text-gray-1">
              Trello clone
            </h1>
            <h3 className="text-left text-3xl font-bold text-primary-6">
              by qvifle
            </h3>
          </div>

          <div className="flex w-full items-center justify-start gap-2">
            <Link target="_blank" href="https://github.com/qvifle">
              <Button variant="faded" isIconOnly>
                <GhIcon color="var(--gray-12)" />
              </Button>
            </Link>
            <Link target="_blank" href="https://www.instagram.com/qvifle.dev">
              <Button variant="faded" isIconOnly>
                <Instagram color="var(--gray-12)" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="filter-opacity-15 flex h-full w-full flex-col items-center justify-between px-4 py-[40px] backdrop-blur-md md:items-center md:justify-center md:rounded-l-3xl md:p-0">
          <div className="mx-auto flex max-w-max flex-col md:hidden">
            <h1 className="text-center text-4xl font-semibold leading-[36px] text-gray-1">
              Trello clone
            </h1>
            <h3 className="text-end text-3xl font-bold text-primary-6">
              by qvifle
            </h3>
          </div>

          <Card className="w-full max-w-[400px]">
            <CardHeader>
              <h2 className="text-2xl font-medium md:text-4xl">Login</h2>
            </CardHeader>
            <Divider />
            <CardBody>
              <p className="md:text-md mx-1 mb-4 text-sm text-gray-10">
                Login to your account if you have already or{" "}
                <Link
                  className="font-medium text-primary-9"
                  href="/registration"
                >
                  Sign up
                </Link>
              </p>
              <LoginForm />
            </CardBody>
          </Card>

          <div className="flex w-full items-center justify-center gap-2 md:hidden">
            <Link target="_blank" href="https://github.com/qvifle">
              <Button variant="faded" isIconOnly>
                <GhIcon color="var(--gray-12)" />
              </Button>
            </Link>
            <Link target="_blank" href="https://www.instagram.com/qvifle.dev">
              <Button variant="faded" isIconOnly>
                <Instagram color="var(--gray-12)" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}

export default LoginModule

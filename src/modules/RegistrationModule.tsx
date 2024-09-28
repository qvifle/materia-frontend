import RegistrationForm from "@/components/forms/RegistrationForm"
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react"
import { Github as GhIcon, Instagram } from "lucide-react"
import Link from "next/link"
import React from "react"
import bg from "public/registrationImage.jpg"
import BluredBackground from "@/components/images/BluredBackground"

const RegistrationModule = () => {
  return (
    <main className="h-dvh bg-cover">
      <BluredBackground src={bg} />
      <div className="flex h-full items-center md:grid md:grid-cols-[5fr,4fr]">
        <section className="filter-opacity-15 flex h-full w-full flex-col items-center justify-between px-4 py-[40px] backdrop-blur-md md:items-center md:justify-center md:rounded-l-3xl md:p-0">
          <div className="mx-auto flex max-w-max flex-col md:hidden">
            <h1 className="text-center text-4xl font-semibold leading-[36px] text-gray-1">
              Matēria
            </h1>
            <h3 className="text-end text-3xl font-bold text-primary-6">
              by qvifle
            </h3>
          </div>

          <Card className="w-full max-w-[400px]">
            <CardHeader>
              <h2 className="text-2xl font-medium md:text-4xl">Registration</h2>
            </CardHeader>
            <Divider />
            <CardBody>
              <p className="md:text-md mx-1 mb-4 text-sm text-gray-10">
                If you already have account -{" "}
                <Link className="font-medium text-primary-9" href="/login">
                  Sign in
                </Link>
              </p>
              <RegistrationForm />
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

        <section className="hidden h-screen w-full flex-col items-end justify-between p-[40px] md:flex">
          <div className="flex max-w-max flex-col items-start">
            <h1 className="w-full text-right text-4xl font-semibold leading-[36px] text-gray-1">
              Matēria
            </h1>
            <h3 className="text-start text-3xl font-bold text-primary-6">
              by qvifle
            </h3>
          </div>

          <div className="flex w-full items-center justify-end gap-2">
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

export default RegistrationModule

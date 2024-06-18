import RegistrationForm from "@/components/forms/RegistrationForm";
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { Github as GhIcon, Instagram } from "lucide-react";
import Link from "next/link";
import React from "react";

const RegistrationModule = () => {
  return (
    // <main className="h-screen bg-[url('/registrationImage.jpg')] bg-cover grid grid-cols-[4fr,5fr] grid-rows-1 max-[1100px]:flex">
    <main className="bg-[url('/registrationImage.jpg')] bg-cover min-h-screen h-full  ">
      <div className=" h-screen flex items-center md:grid md:grid-cols-[5fr,4fr]">
        <section className="h-full w-full flex flex-col justify-between items-center py-[40px] md:p-0 md:items-center md:justify-center filter-opacity-15 px-4 backdrop-blur-md md:rounded-l-3xl">
          <div className="flex flex-col max-w-max mx-auto md:hidden">
            <h1 className="text-gray-1 text-4xl leading-[36px] font-semibold text-center">
              Trello clone
            </h1>
            <h3 className="text-primary-6 text-3xl font-bold text-end">
              by qvifle
            </h3>
          </div>

          <Card className="max-w-[400px] w-full">
            <CardHeader>
              <h2 className="text-2xl font-medium md:text-4xl">Registration</h2>
            </CardHeader>
            <Divider />
            <CardBody>
              <p className="text-sm text-gray-10 mx-1 mb-4 md:text-md">
                If you already have account -{" "}
                <Link className="text-primary-9 font-medium" href="/login">
                  Sign in
                </Link>
              </p>
              {/* <LoginForm /> */}
              <RegistrationForm />
            </CardBody>
          </Card>

          <div className="w-full flex items-center justify-center gap-2 md:hidden">
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

        <section className="hidden md:flex flex-col justify-between items-end h-screen w-full p-[40px]">
          <div className="flex flex-col max-w-max items-end">
            <h1 className="text-gray-1 text-4xl leading-[36px] font-semibold text-right w-full">
              Trello clone
            </h1>
            <h3 className="text-primary-6 text-3xl font-bold text-right">
              by qvifle
            </h3>
          </div>

          <div className="w-full flex items-center justify-end gap-2">
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
  );
};

export default RegistrationModule;

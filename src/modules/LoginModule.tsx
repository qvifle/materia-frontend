"use client";
import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import Link from "next/link";
import { Github as GhIcon, Instagram } from "lucide-react";
import LoginForm from "@/components/forms/LoginForm";

const LoginModule = () => {
  return (
    <main className="bg-[url('/loginImage.png')] bg-cover min-h-screen h-full  ">
      <div className=" h-screen flex items-center md:grid md:grid-cols-[4fr,5fr]">
        <section className="hidden md:flex flex-col justify-between h-screen w-full p-[40px]">
          <div className="flex flex-col max-w-max  ">
            <h1 className="text-gray-1 text-4xl leading-[36px] font-semibold text-left w-full">
              Trello clone
            </h1>
            <h3 className="text-primary-6 text-3xl font-bold text-left">
              by qvifle
            </h3>
          </div>

          <div className="w-full flex items-center justify-start gap-2">
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
              <h2 className="text-2xl font-medium md:text-4xl ">Login</h2>
            </CardHeader>
            <Divider />
            <CardBody>
              <p className="text-sm text-gray-10 mx-1 mb-4 md:text-md">
                Login to your account if you have already or{" "}
                <Link
                  className="text-primary-9 font-medium"
                  href="/registration"
                >
                  Sign up
                </Link>
              </p>
              <LoginForm />
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
      </div>
    </main>
  );
};

export default LoginModule;

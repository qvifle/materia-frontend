import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import CredentialsLoginForm from "./CredentialsLoginForm";
import { Separator } from "../ui/separator";

const LoginForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="max-[467px]:mb-4">Login</CardTitle>
        <CardDescription className="leading-[8px]">
          <span> Login to your account if you have already or</span>
          <Button variant="link" asChild className="p-0 ml-1">
            <Link href="/registration">Sign up</Link>
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CredentialsLoginForm />
        <div className="grid grid-cols-[1fr,1fr,1fr] grid-rows-1 items-center gap-2 mt-4">
          <Separator />
          <p className="w-max leading-7 text-muted-foreground">
            or continue with
          </p>
          <Separator />
        </div>
        <Button variant="outline" className="w-full mt-1">
          Google
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginForm;

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
import CredentialsRegistrationForm from "./CredentialsRegistrationForm";

const RegistrationForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="max-[588px]:mb-4 mb-2">Registration</CardTitle>
        <CardDescription className="leading-[16px]">
          <span>
            Create new account for continue. If you already have account -
          </span>
          <Button variant="link" asChild className="p-0 ml-1">
            <Link href="/login">Sign in</Link>
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CredentialsRegistrationForm />
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

export default RegistrationForm;

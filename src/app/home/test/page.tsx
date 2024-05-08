"use client";
import authService from "@/services/AuthService";
import React from "react";

const page = () => {
  return (
    <div>
      <button
        onClick={() =>
          authService.signIn({
            email: "qvifffle@gmail.com",
            password: "12345678",
          })
        }
      >
        sign in
      </button>
    </div>
  );
};

export default page;

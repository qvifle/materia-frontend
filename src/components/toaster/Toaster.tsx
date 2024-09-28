"use client"
import React from "react"
import { Toaster } from "react-hot-toast"

const MyToaster = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          backgroundColor: "var(--gray-12)",
          color: "var(--gray-1)",
        },
      }}
      position="top-right"
    />
  )
}

export default MyToaster

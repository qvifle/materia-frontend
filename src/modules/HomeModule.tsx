"use client"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

const HomeModule = () => {
  const router = useRouter()
  useEffect(() => {
    router.push("/home/projects")
  })

  return <div></div>
}

export default HomeModule

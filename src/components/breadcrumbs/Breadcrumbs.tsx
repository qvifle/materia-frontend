"use client"
import capitalize from "@/lib/utils/capitalize"
import projectService from "@/services/ProjectService"
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"

const CustomBreadcrumbs = () => {
  const [titles, setTitles] = useState<string[]>([])
  const [isLoading, setLoading] = useState(true)
  const pathName = usePathname()
  const pathNames = pathName.split("/").slice(1)

  useEffect(() => {
    const getTitles = async (pathNames: string[]) => {
      setLoading(true)
      const titles = []
      for (let i = 0; i < pathNames.length; i++) {
        if (pathNames[i].length < 30) {
          titles.push(capitalize(pathNames[i]))
          continue
        } else {
          try {
            const { data, status } = await projectService.getProjectById(
              pathNames[i],
            )
            if (status === 403) {
              titles.push("-")
            }
            titles.push(data.title)
            continue
          } catch (err) {
            console.log(err)
          }
        }
      }

      setTitles(titles)
      setLoading(false)
    }

    getTitles(pathNames)
  }, [pathName])

  if (isLoading) {
    return (
      <Breadcrumbs className="mb-2 px-4 pt-4">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>...</BreadcrumbItem>
      </Breadcrumbs>
    )
  }

  return (
    <Breadcrumbs className="mb-2 px-4 pt-4" underline="hover">
      {pathNames.map((el, key) => (
        <BreadcrumbItem
          key={key}
          href={
            key == 0 ? undefined : "/" + pathNames.slice(0, key + 1).join("/")
          }
        >
          {titles[key]}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  )
}

export default CustomBreadcrumbs

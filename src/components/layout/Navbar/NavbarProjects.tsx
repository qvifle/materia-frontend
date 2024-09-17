import { IProject } from "@/types/project.types"
import React from "react"
import { SortedProjects } from "../Navbar"
import { NavbarMenuItem } from "@nextui-org/react"
import Link from "next/link"
import Emoji from "@/lib/utils/Emoji"
import useDialog from "@/lib/hooks/useDialog"

const MenuItem = ({ item }: { item: IProject }) => {
  return (
    <NavbarMenuItem className="ml-2">
      <Link
        // onClick={() => setIsMenuOpen(false)}
        className="flex w-full items-center gap-2"
        href={`/home/projects/${item.id}`}
      >
        <span>
          {item.iconUrl ? <Emoji unifiedCode={item.iconUrl} /> : null}
        </span>
        <span>{item.title}</span>
      </Link>
    </NavbarMenuItem>
  )
}

const NavbarProjects = ({
  projects,
}: {
  projects: SortedProjects | undefined
}) => {
  const { open: openDialog } = useDialog()
  if (
    !projects ||
    (!projects.myProjects.length && !projects.otherProjects.length)
  ) {
    return (
      <p>
        <span>You have no projects yet.</span>{" "}
        <span
          onClick={() => openDialog("create-project")}
          className="text-primary-500"
        >
          Create!
        </span>
      </p>
    )
  }

  return (
    <>
      {!!projects.myProjects.length && (
        <>
          <NavbarMenuItem key="my-projects" className="font-medium">
            My projects
          </NavbarMenuItem>
          {projects.myProjects.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </>
      )}
      {!!projects.otherProjects.length && (
        <>
          <NavbarMenuItem key="my-projects" className="font-medium">
            Collaborates
          </NavbarMenuItem>
          {projects.otherProjects.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </>
      )}
    </>
  )
}

export default NavbarProjects

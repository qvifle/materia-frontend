import Link from "next/link"

const SidebarHeader = () => {
  return (
    <Link href="/home">
      <span className="h-[48px] w-full items-center justify-center text-xl font-[800] lg:hidden lg:justify-start lg:text-3xl">
        Mā
      </span>
      <span className="hidden h-[48px] w-full items-center justify-center text-xl font-[800] lg:block lg:justify-start lg:text-3xl">
        Matēria
      </span>
    </Link>
  )
}

export default SidebarHeader

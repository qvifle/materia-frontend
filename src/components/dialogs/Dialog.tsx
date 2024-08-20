"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { HTMLAttributes, ReactNode, Suspense, useEffect, useState } from "react"
import { Modal as NModal } from "@nextui-org/react"
import useDialog from "@/lib/hooks/useDialog"

interface IModal extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  searchParam: string
}

const Modal: React.FC<IModal> = ({ children, searchParam, ...rest }) => {
  const [isMounted, setMounted] = useState(false)
  const searchParams = useSearchParams()
  const isOpen = searchParams?.get(searchParam) === "y"
  const { close } = useDialog()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  // if (!isOpen) {
  //   return null;
  // }

  return (
    <NModal onOpenChange={close} backdrop="blur" isOpen={isOpen}>
      {children}
    </NModal>
  )
}

export default Modal

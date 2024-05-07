"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  HTMLAttributes,
  ReactNode,
  Suspense,
  useEffect,
  useState,
} from "react";
import { Dialog } from "../ui/dialog";

interface IModal extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  searchParam: string;
}

const Modal: React.FC<IModal> = ({ children, searchParam, ...rest }) => {
  const [isMounted, setMounted] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpen = searchParams?.get(searchParam) === "y";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // if (!isOpen) {
  //   return null;
  // }

  return <Dialog  open={isOpen}>{children}</Dialog>;
};

export default Modal;

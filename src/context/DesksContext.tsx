import { IDesk } from "@/types/desk.types"
import React, { createContext, ReactNode, useContext, useState } from "react"

interface DesksContext {
  desks: IDesk[]
  setDesks: React.Dispatch<React.SetStateAction<IDesk[]>>
}

const DesksContext = createContext<DesksContext | null>(null)

const DesksContextProvider = ({ children }: { children: ReactNode }) => {
  const [desks, setDesks] = useState<IDesk[]>([])

  const value: DesksContext = {
    desks,
    setDesks,
  }

  return <DesksContext.Provider value={value}>{children}</DesksContext.Provider>
}

export const useDesksContext = () => useContext(DesksContext) as DesksContext

export default DesksContextProvider

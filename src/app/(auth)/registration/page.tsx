import RegistrationModule from "@/modules/RegistrationModule"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Registration",
}

const RegistrationPage = () => {
  return <RegistrationModule />
}

export default RegistrationPage

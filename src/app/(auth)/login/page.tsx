import LoginModule from "@/modules/LoginModule"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login",
}
const Page = () => {
  return <LoginModule />
}

export default Page

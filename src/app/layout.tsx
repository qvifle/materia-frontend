import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import Providers from "@/components/providers/Providers"
import DialogsContainer from "@/components/dialogs/DialogsContainer"
import Toaster from "@/components/toaster/Toaster"
import "../styles/globals.css"

const inter = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: "Matēria: Powerful Kanban Task Management for Your Projects",
    template: "%s | Matēria: Powerful Kanban Task Management for Your Projects",
  },
  creator: "Kopytin Igor",
  authors: [{name: "Kopytin Igor","url": ""}],
  robots: "",
  description:
    "Organize and manage your projects effortlessly with our Kanban-based task management tool. Create, track, and prioritize tasks with ease to boost productivity and streamline your workflow.",
  openGraph: {
    title: "Matēria: Powerful Kanban Task Management for Your Projects",
    description:
      "Organize and manage your projects effortlessly with our Kanban-based task management tool. Create, track, and prioritize tasks with ease to boost productivity and streamline your workflow.",
    type: "website",
    locale: "en_US",
    siteName: "Matēria",

    // url: ""
  },
  // metadataBase: new URL("domen/"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("font-sans antialiased", inter.variable)}>
        <Providers>
          {children}
          <Toaster />
          <DialogsContainer />
        </Providers>
      </body>
    </html>
  )
}

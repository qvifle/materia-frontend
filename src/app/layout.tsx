import type { Metadata, Viewport } from "next"
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import Providers from "@/components/providers/Providers"
import DialogsContainer from "@/components/dialogs/DialogsContainer"
import Toaster from "@/components/toaster/Toaster"
import "../styles/globals.css"
import metadataConfig from "@/lib/constants/metadata"

const inter = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = metadataConfig
export const viewport: Viewport = {
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("font-", inter.className, inter.variable)}>
        <Providers>
          {children}
          <Toaster />
          <DialogsContainer />
        </Providers>
      </body>
    </html>
  )
}

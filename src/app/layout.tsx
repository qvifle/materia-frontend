import type { Metadata } from "next";
import { Rubik as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/providers/Providers";
import DialogsContainer from "@/components/dialogs/DialogsContainer";
import Toaster from "@/components/toaster/Toaster";

const rubik = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Clone Trello",
  description: "Creating portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen antialiased font-sans", rubik.variable)}>
        <Providers>
          {children}
          <Toaster />
          <DialogsContainer />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Providers from "@/components/providers/Providers";
import DialogsContainer from "@/components/dialogs/DialogsContainer";
import Toaster from "@/components/toaster/Toaster";
import "./globals.css";

const inter = FontSans({
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
      <body className={cn("antialiased font-sans", inter.variable)}>
        <Providers>
          {children}
          <Toaster />
          <DialogsContainer />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs"
import Navbar from "@/components/Navbar";
import ClientProvider from "./ClientProvider";
// import "@stream-io/video-react-sdk/dist/css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meetings App",
  description: "Video calling built with  Next.js and stream",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
       <ClientProvider> 
        <Navbar/>
        <main className="mx-auto max-w-5xl px-3 py-6">{children}</main>
        </ClientProvider>
        </body>
    </html>
    </ClerkProvider>
  );
}

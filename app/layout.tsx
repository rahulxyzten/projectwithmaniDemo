import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import SmoothScroll from "@/components/SmoothScroll";
import { getSession } from "next-auth/react";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Project With Mani",
  description: "Project With Mani",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className="dark min-h-screen bg-black-100 font-poppins">
        <Providers session={session}><SmoothScroll>{children}</SmoothScroll></Providers>
      </body>
    </html>
  );
}

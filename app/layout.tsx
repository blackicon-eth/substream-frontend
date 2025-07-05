import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "sonner";
import { cookies } from "next/headers";
import Header from "@/components/custom-ui/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Substream",
  description: "Substream is a platform for generating your intmax ens subdomain",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieString = cookieStore
    .getAll()
    .map((c: any) => `${c.name}=${c.value}`)
    .join("; ");
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} size-full text-white bg-black antialiased`}
      >
        <Providers cookies={cookieString}>
          <Header />
          {children}
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


export const metadata: Metadata = {
  title: "Monitoring Marketplace",
  description: "Dashboard for monitoring fulfillment metrics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-sans antialiased", fontInter.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

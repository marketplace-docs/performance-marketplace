import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { AdminProvider } from "@/hooks/use-admin";
import Header from "@/components/header";

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
        <AdminProvider>
          <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
            <Header />
            {children}
          </div>
          <Toaster />
        </AdminProvider>
      </body>
    </html>
  );
}

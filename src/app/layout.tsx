import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PropertyProvider } from "@/context/PropertyProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Property-Project | Akshay Bhasin",
  description: "This website is designed and made by Akshay Bhasin",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <PropertyProvider> 
        <body className={inter.className}>{children}</body>
      </PropertyProvider>
    </html>
  );
}

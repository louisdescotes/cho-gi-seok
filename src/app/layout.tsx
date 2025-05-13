import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./css/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cho Gi-Seok",
  description: "Artist Cho Gi-Seok",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} antialiased min-h-svh`}>
        {/* <Header /> */}
        {children}
      </body>
    </html>
  );
}

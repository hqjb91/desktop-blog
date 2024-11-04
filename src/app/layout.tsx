import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Blog | He Quanjie",
  description: "He Quanjie's Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`h-screen bg-gradient-to-r from-cyan-500 to-blue-500`}
      >
        {children}
      </body>
    </html>
  );
}

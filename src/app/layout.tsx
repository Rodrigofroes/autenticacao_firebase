import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Autenticação Google",
  description: "Autenticação com Google usando Firebase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Civic Legal AI",
  description: "Plain-language legal and civic information with responsible AI safeguards."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BlindAI - AI-Arranged Blind Dates",
  description: "Stop swiping. Start dating. Our AI arranges real dates with real people.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";

const rounded = M_PLUS_Rounded_1c({
  variable: "--font-rounded",
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chess Wrapped",
  description:
    "Turn your chess into a story worth sharing. Enter a Chess.com username and create a Wrapped you'll want to show off.",
  openGraph: {
    title: "Chess Wrapped",
    description: "Turn your chess into a story worth sharing.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chess Wrapped",
    description: "Turn your chess into a story worth sharing.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rounded.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}

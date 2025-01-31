import type { Metadata } from "next";
import localFont from "next/font/local";
import { SessionProvider } from "@/context/useSession";
const geistSans = localFont({
  src: "./../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tikethub",
  description: "Aplikasi Beli tiket",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <SessionProvider>
        {children}
        </SessionProvider>
      </body>
    </html>
  );
}

import Navbar from "@/components/navbar";
import { SessionProvider } from "@/context/useSession";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {" "}
        <SessionProvider>
          {/* <Navbar /> */}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

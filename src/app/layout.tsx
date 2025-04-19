import type { Metadata } from "next";
import "../styles/globals.css";
import { Providers } from "./providers";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Location App",
  description: "Add locations, list and create routes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/hooks/ReduxProvider";
import PWARegister from "@/components/common/PWARegister";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mosque Management System",
  description: "Manage mosque activities, prayers, and donations",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mosque Manage",
  },
};

export const viewport = {
  themeColor: "#0f766e",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} h-full antialiased`}
    >
      <body className={`${roboto.className} min-h-full pb-10 md:pb-0 flex flex-col`}>
        <ReduxProvider>
          <PWARegister />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}


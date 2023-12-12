import "@/app/globals.css";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import { Montserrat } from "next/font/google";

import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Header from "@/components/header/Header";
import { Layout } from "@/components/dom/Layout";
// import { SocketProvider } from "@/components/providers/SocketProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata = {
  title: "SpringSense",
  description: "SpringSense - A Springshed Management Tool",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {/* <SocketProvider> */}
            <Layout>
              <Header />
              {children}
              {/* </SocketProvider> */}
            </Layout>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

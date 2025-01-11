import type { Metadata } from "next";
import { CryptoDataProvider } from "@/app/context/CryptoDataContext";

import "./style.css";
import {Header} from "@/components/Header/Header";
import {Sidebar} from "@/components/Sidebar/Sidebar";
import './Layout.css';



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body >
    <CryptoDataProvider>
      <Sidebar/>
      <div className="content">
        <Header/>
        {children}
      </div>
    </CryptoDataProvider>
    </body>
    </html>
  );

}
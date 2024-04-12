import Footer from "@/components/footer/Footer";
import "../globals.css";
import Nav from "@/components/Header/Nav";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import  {Providers}  from "../provider";
import { Suspense } from 'react'
import Loading from "@/components/Loading";


export const metadata = {
  title: "The Omni Blog",
  description: `Website for blogs and have an admin dashboard where admin can see all blogs there 
  category and perform CRUD operations and all blogs are store in MongoDB Atlas.`,
};
export default function RootLayout({ children}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
      <NextSSRPlugin
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <Providers>

        <Nav/>
        <Suspense fallback={<Loading/>}>
        {children}
        </Suspense>
        <Footer/>
        </Providers>
        </body>
    </html>
  );
}

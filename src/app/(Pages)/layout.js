import Footer from "@/components/footer/Footer";
import "../globals.css";
import Nav from "@/components/Header/Nav";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";


export const metadata = {
  title: "The Omni Blog",
  description: `Website for blogs and have an admin dashboard where admin can see all blogs there 
  category and perform CRUD operations and all blogs are store in MongoDB Atlas.`,
};
export default function RootLayout({ children}) {
  return (
    <html lang="en">
      <body>
      <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <Nav/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}

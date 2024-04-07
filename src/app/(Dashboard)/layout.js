import "../globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import  {Providers}  from "../provider";

export const metadata = {
  title: "Admin | Omni Blog",
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
        {children}
        </Providers>
        </body>
    </html>
  );
}

import Footer from "@/components/footer/Footer";
import "../globals.css";
import Nav from "@/components/Header/Nav";


export const metadata = {
  title: "The Omni Blog",
  description: `Website for blogs and have an admin dashboard where admin can see all blogs there 
  category and perform CRUD operations and all blogs are store in MongoDB Atlas.`,
};
export default function RootLayout({ children}) {
  return (
    <html lang="en">
      <body>
        <Nav/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}

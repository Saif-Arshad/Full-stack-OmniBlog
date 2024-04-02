
export const metadata = {
  title: "Admin Dashboard | Omni Blogs",
  description: `Website for blogs and have an admin dashboard where admin can see all blogs there 
  category and perform CRUD operations and all blogs are store in MongoDB Atlas.`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        </body>
    </html>
  );
}

import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import DbConnection from '@/Mongodb/mongodb';
import Admin from '@/Models/Admin';


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        // Define the credentials you expect from users
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        try {
          await DbConnection();
          const admin = await Admin.findOne({ email });
          if (!admin) {
            return null;
          }
          console.log(password,admin.password);
          const currentPassword =  (password === admin.password);
          console.log(currentPassword);

          if (!currentPassword) {
            return null;
          }
          return admin;
        } catch (error) {
          console.error("Error during authentication:", error);
          return null; 
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/admin",
  },
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;

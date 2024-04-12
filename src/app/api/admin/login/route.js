import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import DbConnection from "@/Mongodb/mongodb";
import Admin from "@/Models/Admin";
export async function POST(req) {
    try {
        await DbConnection();
        const { Email, Password } = await req.json();
        const admin = await Admin.findOne({ email: Email });

        if (!admin) {
            // console.log("Email is wrong");
            return NextResponse.json({ error: "Email is wrong"});        }

            const currentPassword =  (Password === admin.password);
            // console.log(currentPassword);
            if (!currentPassword) {
                // console.log("password is not valid");
                return NextResponse.json({ error: "Password is wrong"});        }
 
        const tokenData = {
            id: admin._id,
            username: admin.Firstname + " " + admin.Lastname,
            email: admin.email
        };
        // console.log(tokenData);
        
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });
        
        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response; 

    } catch (err) {
        // console.log(err);
        return NextResponse.json({ message: "Error occurred while logging in" }, { status: 500 });
    }
}

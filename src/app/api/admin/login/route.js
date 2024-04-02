import { Jwt } from "jsonwebtoken";
import { NextResponse } from "next/server";
import DbConnection from "@/Mongodb/mongodb";
import Admin from "@/Mongodb/models/Admin";
export async function POST(req) {
    try {
        await DbConnection();
        const { Email, Password } = await req.json();
        const admin = await Admin.findOne({ email: Email });

        if (!admin) {
            return NextResponse.json({ userExists: false });
        }

        const tokenData = {
            id: admin._id,
            username: admin.Fname + " " + admin.Lname,
            email: admin.Email
        };
        console.log(tokenData);
        
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
        console.log(err);
        return NextResponse.json({ message: "Error occurred while logging in" }, { status: 500 });
    }
}

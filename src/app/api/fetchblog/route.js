import BlogModel from "@/Models/Blog";
import DbConnection from "@/Mongodb/mongodb";
import { NextResponse } from "next/server";


   export async function GET(){
    try {
        await DbConnection()
        const res = await BlogModel.find().lean();

        return NextResponse.json({res})
    } catch (error) {
            return NextResponse.json("Something went wrong")
    }   


   }
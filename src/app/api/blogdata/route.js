import BlogModel from "@/Models/Blog";
import DbConnection from "@/Mongodb/mongodb";
import { NextResponse } from "next/server";


export async function GET(req){
    const id = req.nextUrl.searchParams.get("id") ;
    console.log(id);
    try {
        await DbConnection()
        const blog =  await BlogModel.findOne({_id:id})
        return NextResponse.json({blog})
    } catch (error) {
            console.log(error);
    }
    
}
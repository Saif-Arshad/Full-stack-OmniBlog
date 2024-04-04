import BlogModel from "@/Models/Blog"
import DbConnection from "@/Mongodb/mongodb"
import { NextResponse } from "next/server"



export async function GET(request,{params}) {
    const {id} = params
   console.log(id);

    await DbConnection()
    const find = BlogModel.findOne({_id:id})
    return NextResponse({find})
}
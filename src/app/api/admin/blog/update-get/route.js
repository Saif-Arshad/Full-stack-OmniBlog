import BlogModel from "@/Models/Blog";
import DbConnection from "@/Mongodb/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        // const { id } = params;
    const edit = request.nextUrl.searchParams.get("id");
        console.log(edit);

        await DbConnection();
        const blog = await BlogModel.findOne({ _id: edit });

        if (!blog) {
            return NextResponse.error(new Error("Blog not found"), { status: 404 });
        }

        return NextResponse.json({ blog });
    } catch (error) {
        console.error("Error fetching blog:", error);
        return NextResponse.error(new Error("Internal Server Error"), { status: 500 });
    }
}

import DbConnection from "@/Mongodb/mongodb";
import BlogModel from "@/Models/Blog";

export async function POST(req) {
    try {
        const { title, category, Image, Author, Maincontent,subtitleFields  } = await req.json();
        await DbConnection();
        
        // Create an array to store the subtitle objects
        const subContentArray = [];
        
        // Iterate over each subtitle object and create a new object
        // with the required fields for your schema
        for (const subtitle of subtitleFields) {
            const { image,content } = subtitle;
            const title =subtitle.subtitle;
            console.log(subtitle);
            console.log(title);
            subContentArray.push({
                image,
                title,
                content
            });
        }
        
        // Create a new BlogModel instance with the provided data
        const newBlog = await BlogModel.create({
            title,
            maincontent: Maincontent,
            author: Author,
            categorie: category,
            image: Image,
            subContent: subContentArray 
        });

        // Save the new blog document to the database
        await newBlog.save();

        // Return a success response
        return new Response("Blog created successfully", { status: 200 });
    } catch (error) {
        console.log(error);
        // Return an error response in case of any errors
        return new Response("Internal Server Error", { status: 500 });
    }
}

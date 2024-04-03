"use client";
 
import { UploadButton } from "@/utils/uploadthing";
 
export default function Home() {
  return (
    <main className="flex h-5 flex-col items-center text-blue-950 bg-slate-600 justify-between p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
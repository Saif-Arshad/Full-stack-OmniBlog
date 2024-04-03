const { generateUploadButton, generateUploadDropzone } = require("@uploadthing/react");
const { OurFileRouter } = require("@/app/api/uploadthing/core");

const UploadButton = generateUploadButton();
const UploadDropzone = generateUploadDropzone();

module.exports = { UploadButton, UploadDropzone };

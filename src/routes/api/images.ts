import express from "express";
import url from "url";
import processImage from "../../middleware/processor";
// import {existsSync} from "fs";
// import {promises as fsPromises} from "fs";

const images = express.Router()

images.get("/", async (req, res) => {
    const queryObject = url.parse(req.url, true).query 
    await processImage(queryObject);
    // while(!existsSync(`./src/assets/thumb/${queryObject.image}_thumb(${queryObject.width}x${queryObject.height}).jpg`)) {
    //     setTimeout(() => console.log("Image still processing..."), 1000)
    // }
    await res.sendFile(`C:/Users/26377/WebDev/Udacity Projects/ImageProcessingAPI/image-processing-api/src/assets/thumb/${queryObject.image}_thumb(${queryObject.width}x${queryObject.height}).jpg`);
})

export default images;
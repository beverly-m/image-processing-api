import express from "express";
import url from "url";
import processImage from "../../utililties/processor";
// import {existsSync} from "fs";
// import {promises as fsPromises} from "fs";

const images = express.Router()

images.get("/", async (req, res) => {
    const queryObject = url.parse(req.url, true).query 

    if (queryObject.width === undefined || queryObject.height === undefined || queryObject.image === undefined) {
        res.status(400).send("Invalid URL parameters sent");
    }
    else {
    await processImage(queryObject);
    // while(!existsSync(`./src/assets/thumb/${queryObject.image}_thumb(${queryObject.width}x${queryObject.height}).jpg`)) {
    //     setTimeout(() => console.log("Image still processing..."), 1000)
    // }

    await res.status(200).sendFile(`C:/Users/26377/WebDev/Udacity Projects/ImageProcessingAPI/image-processing-api/src/assets/thumb/${queryObject.image}_thumb(${queryObject.width}x${queryObject.height}).jpg`);
    }
})

export default images;
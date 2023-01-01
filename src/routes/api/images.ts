import express from "express";
import url from "url";
import processImage from "../../utililties/processor";

const images = express.Router()

images.get("/", async (req, res) => {
    const queryObject = url.parse(req.url, true).query 

    if (queryObject.width === undefined || queryObject.height === undefined || queryObject.image === undefined) {
        res.status(400).send("Invalid URL parameters sent");
    }
    else {
        const result = await processImage(queryObject);

        if (!(JSON.stringify(result) == "{}")) {

            await res.status(200).sendFile(`C:/Users/26377/WebDev/Udacity Projects/ImageProcessingAPI/image-processing-api/src/assets/thumb/${queryObject.image}_thumb(${queryObject.width}x${queryObject.height}).jpg`);
        } else {
            res.status(404).send("Image file name does not exist")    
        }         
    }

})

export default images;
import express from "express";
import url from "url";
import processImage from "../../utilities/processor";
import path from "path";
import apicache from "apicache";

const images = express.Router()

const cache = apicache.middleware

const status200 = (req: Request, res: Response) => res.status === 200

const cacheStatus200 = cache('60 minutes', status200)

images.get("/", cacheStatus200 , async (req, res) => {
    const queryObject = url.parse(req.url, true).query 

    const image: string = ((queryObject.image) as unknown) as string; 
    const width: string = ((queryObject.width) as unknown) as string; 
    const height: string = ((queryObject.height) as unknown) as string;

    if (width === undefined || height === undefined || image === undefined) {
        res.status(400).send("Invalid URL parameters sent");
    }
    else {
        const result = await processImage(queryObject);

        if (!(JSON.stringify(result) == "{}")) {

            const thumbImagePath: string = path.join(__dirname, "..", ".." , "..", "src" ,"assets", "thumb", `${image}_thumb(${width}x${height}).jpg`)

            await res.status(200).sendFile(thumbImagePath);

            // await res.status(200).sendFile(`C:/Users/26377/WebDev/Udacity Projects/ImageProcessingAPI/image-processing-api/src/assets/thumb/${queryObject.image}_thumb(${queryObject.width}x${queryObject.height}).jpg`);
        } else {
            res.status(404).send("Image file name does not exist")    
        }         
    }

})

export default images;
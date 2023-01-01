import express from "express";
import url from "url";
import processImage from "../../utilities/processor";
import path from "path";
import apicache from "apicache";
import { hrtime } from "node:process";
import convertHrtime from "convert-hrtime";
import { existsSync } from "fs";

const images = express.Router()

const cache = apicache.middleware

const status200 = (req: Request, res: Response) => res.status === 200

const cacheStatus200 = cache('60 minutes', status200)

images.get("/", cacheStatus200 , async (req, res) => {
    const start: [number, number] = hrtime();

    const queryObject = url.parse(req.url, true).query 

    const image: string = ((queryObject.image) as unknown) as string; 
    const width: string = ((queryObject.width) as unknown) as string; 
    const height: string = ((queryObject.height) as unknown) as string;

    if (width === undefined || height === undefined || image === undefined) {
        res.status(400).send("Invalid URL parameters sent");
    }
    else {

        const thumbImagePath: string = path.join(__dirname, "..", ".." , "..", "src" ,"assets", "thumb", `${image}_thumb(${width}x${height}).jpg`)

        const imagePath = `./src/assets/thumb/${image}_thumb(${width}x${height}).jpg`

        if (existsSync(imagePath)){
            await res.status(200).sendFile(thumbImagePath);
        } else {

            const result = await processImage(queryObject);

            if (!(JSON.stringify(result) == "{}")) {

                await res.status(200).sendFile(thumbImagePath);

            } else {
                res.status(404).send("Image file name does not exist")    
            } 
        }        
    }

    const processTime: [number, number] = hrtime(start);
    const processTimeMs = convertHrtime(processTime).milliseconds;
    
    console.log(`Image processing took ${processTimeMs} milliseconds`)
})

export default images;
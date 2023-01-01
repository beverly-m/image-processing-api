// import express from "express";
import {promises as fsPromises, existsSync} from "fs";
import { ParsedUrlQuery } from "querystring";
import sharp from "sharp";

// type imgData = {
//         format: string;
//         width: number;
//         height: number;
//         channels: number;
//         premultiplied: boolean;
//         size: number
// }
// import url from "url";

// const processor = express.Router()
// const thumbDir = async (): Promise<void> => {

//     if (!existsSync("./src/assets/thumb/")){
//         await fsPromises.mkdir("./src/assets/thumb/");
//     }
    
// }

// processor.get("/", (req, res, next) => {
    
//     const queryObject = url.parse(req.url, true).query 
    
    const processImage = async (queryObject: ParsedUrlQuery): Promise<object> => {
        
        if(!existsSync(`./src/assets/full/${queryObject.image}.jpg`)) return {};
        
        console.log("Image processing...")

        if (!existsSync("./src/assets/thumb/")){
            await fsPromises.mkdir("./src/assets/thumb/");
        }

        const data = await sharp(`C:/Users/26377/WebDev/Udacity Projects/ImageProcessingAPI/image-processing-api/src/assets/full/${queryObject.image}.jpg`)
        .resize(
            parseInt((queryObject.width as unknown) as string), 
            parseInt((queryObject.height as unknown) as string),
            {fit: sharp.fit.cover})
        .toFile(`C:/Users/26377/WebDev/Udacity Projects/ImageProcessingAPI/image-processing-api/src/assets/thumb/${queryObject.image}_thumb(${queryObject.width}x${queryObject.height}).jpg`)
        .then(data => {
            console.log(JSON.stringify(data)) 
            return data});

        return data;
    }

//     processImage();

//     console.log(queryObject);
//     next();
// })

export default processImage;
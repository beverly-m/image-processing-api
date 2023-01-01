import {promises as fsPromises, existsSync} from "fs";
import { ParsedUrlQuery } from "querystring";
import sharp from "sharp";
import path from "path";
    
const processImage = async (queryObject: ParsedUrlQuery): Promise<object> => {
        const image: string = ((queryObject.image) as unknown) as string; 
        const width: string = ((queryObject.width) as unknown) as string; 
        const height: string = ((queryObject.height) as unknown) as string; 

        const imagePath = `./src/assets/full/${image}.jpg`

        // if(!existsSync(`./src/assets/full/${queryObject.image}.jpg`)) return {};
        
        if(!existsSync(imagePath)) return {};

        console.log("Image processing...")

        const thumbDirPath = "./src/assets/thumb/"

        // if (!existsSync("./src/assets/thumb/")){
        //     await fsPromises.mkdir("./src/assets/thumb/");
        // }

        if (!existsSync(thumbDirPath)){
            await fsPromises.mkdir(thumbDirPath);
        }

        const orgImagePath: string = path.join(__dirname, "..", ".." , "src" ,"assets", "full", `${image}.jpg`)
        const thumbImagePath: string = path.join(__dirname, "..", ".." , "src" ,"assets", "thumb", `${image}_thumb(${width}x${height}).jpg`)

        const data = await sharp(orgImagePath)
        .resize(
            parseInt(width), 
            parseInt(height),
            {fit: sharp.fit.cover})
        .toFile(thumbImagePath)
        .then(data => {
            console.log(JSON.stringify(data)) 
            return data});

        // const data = await sharp(`C:/Users/26377/WebDev/Udacity Projects/ImageProcessingAPI/image-processing-api/src/assets/full/${queryObject.image}.jpg`)
        // .resize(
        //     parseInt((queryObject.width as unknown) as string), 
        //     parseInt((queryObject.height as unknown) as string),
        //     {fit: sharp.fit.cover})
        // .toFile(`C:/Users/26377/WebDev/Udacity Projects/ImageProcessingAPI/image-processing-api/src/assets/thumb/${queryObject.image}_thumb(${queryObject.width}x${queryObject.height}).jpg`)
        // .then(data => {
        //     console.log(JSON.stringify(data)) 
        //     return data});

        return data;
}

export default processImage;
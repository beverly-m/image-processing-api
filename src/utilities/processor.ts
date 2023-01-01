import { promises as fsPromises, existsSync } from 'fs';
import { ParsedUrlQuery } from 'querystring';
import sharp from 'sharp';
import path from 'path';

// function for resizing images
const processImage = async (queryObject: ParsedUrlQuery): Promise<object> => {
    //retrieve data (query params) from request url
    const image: string = queryObject.image as unknown as string;
    const width: string = queryObject.width as unknown as string;
    const height: string = queryObject.height as unknown as string;

    //define image path to check if the image exists in the file system
    const imagePath = `./src/assets/full/${image}.jpg`;

    //return empty object if image does not exist
    if (!existsSync(imagePath)) return {};

    console.log('Image processing...');

    //define thumb path to check if the thumb directory exists in the file system
    const thumbDirPath = './src/assets/thumb/';

    // create the thumb directory if it does not exist
    if (!existsSync(thumbDirPath)) {
        await fsPromises.mkdir(thumbDirPath);
    }

    // define unmanipulated image path
    const orgImagePath: string = path.join(
        __dirname,
        '..',
        '..',
        'src',
        'assets',
        'full',
        `${image}.jpg`
    );

    // define thumbnail image path
    const thumbImagePath: string = path.join(
        __dirname,
        '..',
        '..',
        'src',
        'assets',
        'thumb',
        `${image}_thumb(${width}x${height}).jpg`
    );

    // use defined paths to manipulate original image and save resulting image to the thumb directory
    const data = await sharp(orgImagePath)
        .resize(parseInt(width), parseInt(height), { fit: sharp.fit.cover })
        .toFile(thumbImagePath)
        .then((data) => {
            console.log(JSON.stringify(data));
            return data;
        });

    // return object with thumbnail image data
    return data;
};

export default processImage;

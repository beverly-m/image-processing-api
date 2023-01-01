import express from 'express';
import url from 'url';
import processImage from '../../utilities/processor';
import path from 'path';
import apicache from 'apicache';
import { hrtime } from 'node:process';
import convertHrtime from 'convert-hrtime';
import { existsSync } from 'fs';

const images = express.Router();

// use apicache to cache api responses
const cache = apicache.middleware;

const status200 = (req: Request, res: Response) => res.status === 200;

// responses with a status code of 200 are the only ones that are cached
const cacheStatus200 = cache('60 minutes', status200);

// GET /api/images endpoint
images.get('/', cacheStatus200, async (req, res) => {
    // measure response time (start)
    const start: [number, number] = hrtime();

    // get request url query params
    const queryObject = url.parse(req.url, true).query;

    const image: string = queryObject.image as unknown as string;
    const width: string = queryObject.width as unknown as string;
    const height: string = queryObject.height as unknown as string;

    //check if all parameters where provided
    if (width === undefined || height === undefined || image === undefined) {
        //send error message if not all were provided
        res.status(400).send('Invalid URL parameters sent');
    } else {
        // define thumbnail image path (absolute)
        const thumbImagePath: string = path.join(
            __dirname,
            '..',
            '..',
            '..',
            'src',
            'assets',
            'thumb',
            `${image}_thumb(${width}x${height}).jpg`
        );

        // define thumbnail image path (relative)
        const imagePath = `./src/assets/thumb/${image}_thumb(${width}x${height}).jpg`;

        // check if thumbnail image already exists in file system
        if (existsSync(imagePath)) {
            // send file as a response if it was already created
            await res.status(200).sendFile(thumbImagePath);
        } else {
            // create resized (thumbnail) image if it does not exist using the processImage function
            const result = await processImage(queryObject);

            // if the processImage function did not return an empty object it means that the image was successfully created
            if (!(JSON.stringify(result) == '{}')) {
                // send the created thumbnail image as a response
                await res.status(200).sendFile(thumbImagePath);
            } else {
                // if image processing failed
                res.status(404).send('Image file name does not exist');
            }
        }
    }

    // final response time
    const processTime: [number, number] = hrtime(start);

    // convert from nanoseconds to milliseconds
    const processTimeMs = convertHrtime(processTime).milliseconds;

    console.log(`Image processing took ${processTimeMs} milliseconds`);
});

export default images;

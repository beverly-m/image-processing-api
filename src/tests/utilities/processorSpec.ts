import processImage from "../../utilities/processor"
import {promises as fsPromises, existsSync} from "fs";

describe("2. Test image resizing utility", () => {

    describe('2.1. Test successful retrieval of image', () => { 

        beforeAll(async () => {
            if (existsSync("./src/assets/thumb/fjord_thumb(200x400).jpg")) {
                await fsPromises.rm("./src/assets/thumb/fjord_thumb(200x400).jpg")
            }
        })

        afterEach(async () => {
            await fsPromises.rm("./src/assets/thumb/fjord_thumb(200x400).jpg")
        })

        it("2.1.1. Gets new resized image data", async () => {

            const data = await processImage({image: "fjord", width: "200", height: "400"})

            expect(data).toEqual({
                format: 'jpeg',
                width: 200,
                height: 400,
                channels: 3,
                premultiplied: false,
                size: 11905
            })
        })

        it("2.1.2. Creates resized image in thumb folder", async () => {

            await processImage({image: "fjord", width: "200", height: "400"})

            const created = existsSync("./src/assets/thumb/fjord_thumb(200x400).jpg")

            expect(created).toBeTrue()
        })            
    })

    describe('2.2. Test image retrieval failure', () => { 

        it("2.2.1 Sends empty image data object when image doesn't exist", async () => {
            const data = await processImage({image: "testvalidity", width: "200", height: "400"})
            expect(data).toEqual({});
        })

    })
})



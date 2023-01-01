import processImage from "../../utililties/processor"
import {existsSync} from "fs";

describe("Test image resizing utility", () => {
    it("Gets new resized image data", async () => {

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

    it("Creates resized image in thumb folder", async () => {

        await processImage({image: "fjord", width: "200", height: "400"})

        const created = existsSync("./src/assets/thumb/fjord_thumb(200x400).jpg")

        expect(created).toBeTrue()
    })
})
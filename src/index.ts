import express from 'express';
import routes from "./routes/index"

const app = express();
const port = 3000;

// app.get("/api", (req, res) => {
//     res.send("Hello, Welcome to Image Processing API!")
// })

// app.get("/api/images", (req, res) => {
//     const queryObject = url.parse(req.url, true).query 
//     res.send(queryObject);
// })

app.use("/api", routes);

try {
    app.listen(port, () => {
        console.log(`Server listening on localhost:${port}`);
    });
} catch (error) {
    console.log(error);
}

// const test = (text: string): string => {
//     console.log(text);
//     return text;
// };

// const phrase = 'Hello, World!';
// test(phrase);

// export default test;
